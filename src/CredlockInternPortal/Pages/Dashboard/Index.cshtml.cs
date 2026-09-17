using CredlockInternPortal.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace CredlockInternPortal.Pages.Dashboard;

public class IndexModel(PortalDbContext db) : PageModel
{
    public string FullName { get; private set; } = "";
    public string FirstName => string.IsNullOrWhiteSpace(FullName) ? "there" : FullName.Split(' ')[0];
    public string Role { get; private set; } = "";
    public int ActiveInterns { get; private set; }
    public int LearningProgress { get; private set; }
    public int TaskCompletion { get; private set; }
    public int AttendanceRate { get; private set; }
    public int TotalLessons { get; private set; }
    public int CompletedLessons { get; private set; }
    public int ProjectCount { get; private set; }
    public int UnreadNotifications { get; private set; }

    public async Task<IActionResult> OnGetAsync()
    {
        var userId = HttpContext.Session.GetInt32("UserId");
        FullName = HttpContext.Session.GetString("FullName") ?? "";
        Role = HttpContext.Session.GetString("Role") ?? "";
        if (userId is null || string.IsNullOrWhiteSpace(FullName)) return RedirectToPage("/Login");

        ActiveInterns = await db.InternProfiles.CountAsync(x => x.IsActive);
        TotalLessons = await db.Lessons.CountAsync();
        CompletedLessons = await db.LearningProgress.CountAsync(x => x.Completed);
        LearningProgress = TotalLessons == 0 ? 0 : (int)Math.Round(CompletedLessons * 100.0 / TotalLessons);
        ProjectCount = await db.Projects.CountAsync();
        UnreadNotifications = await db.Notifications.CountAsync(x => x.UserAccountId == userId && !x.IsRead);

        var totalAttendance = await db.Attendance.CountAsync();
        var presentAttendance = await db.Attendance.CountAsync(x => x.Status == "Present" || x.Status == "Late");
        AttendanceRate = totalAttendance == 0 ? 0 : (int)Math.Round(presentAttendance * 100.0 / totalAttendance);
        TaskCompletion = LearningProgress;
        return Page();
    }
}
