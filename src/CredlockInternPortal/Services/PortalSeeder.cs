using CredlockInternPortal.Data;
using CredlockInternPortal.Models;
using Microsoft.EntityFrameworkCore;

namespace CredlockInternPortal.Services;

public static class PortalSeeder
{
    public static async Task SeedAsync(PortalDbContext db)
    {
        await db.Database.EnsureCreatedAsync();
        if (await db.Users.AnyAsync()) return;

        db.Users.AddRange(
            new UserAccount { FullName = "System Administrator", Email = "admin@credlock.africa", PasswordHash = AuthService.HashPassword("Admin@123"), Role = UserRole.Admin },
            new UserAccount { FullName = "HR Administrator", Email = "hr@credlock.africa", PasswordHash = AuthService.HashPassword("Hr@123"), Role = UserRole.HR },
            new UserAccount { FullName = "SIWES Supervisor", Email = "supervisor@credlock.africa", PasswordHash = AuthService.HashPassword("Supervisor@123"), Role = UserRole.Supervisor },
            new UserAccount { FullName = "Demo Intern", Email = "intern@credlock.africa", PasswordHash = AuthService.HashPassword("Intern@123"), Role = UserRole.Intern }
        );
        await db.SaveChangesAsync();

        var internUser = await db.Users.SingleAsync(x => x.Email == "intern@credlock.africa");
        db.InternProfiles.Add(new InternProfile { InternId = "CR-SIWES-001", UserAccountId = internUser.Id, Institution = "Kwara State Polytechnic", Department = "Computer Science", StartDate = DateTime.UtcNow.Date.AddDays(-14), EndDate = DateTime.UtcNow.Date.AddDays(70), Supervisor = "SIWES Supervisor" });

        var weeks = new[] {
            "Credlock + Technical Support + Cybersecurity Orientation", "Smartphone Hardware Fundamentals", "Android Operating System", "Smartphone Networking & Connectivity", "Credlock App & Mobile Application Support", "Device Enrollment & Device Management", "Customer Data Security & Privacy", "Mobile Cybersecurity & Incident Response", "Troubleshooting, Logs & API Awareness", "Ticketing & Engineering Escalation", "Reporting, Analytics & Recurring Issues", "Final Credlock Smartphone Incident Capstone"
        };
        for (var i = 0; i < weeks.Length; i++)
        {
            db.TrainingWeeks.Add(new TrainingWeek { WeekNumber = i + 1, Title = weeks[i], Description = $"Week {i + 1} practical SIWES learning module." });
        }
        await db.SaveChangesAsync();

        foreach (var week in await db.TrainingWeeks.OrderBy(x => x.WeekNumber).ToListAsync())
        {
            db.Lessons.AddRange(
                new Lesson { TrainingWeekId = week.Id, Title = "Core lesson", Description = $"Study the key concepts for {week.Title}.", SortOrder = 1 },
                new Lesson { TrainingWeekId = week.Id, Title = "Practical exercise", Description = "Apply the week’s concepts to an authorized support scenario.", SortOrder = 2 },
                new Lesson { TrainingWeekId = week.Id, Title = "Cybersecurity checkpoint", Description = "Identify security, privacy and escalation considerations.", SortOrder = 3 }
            );
        }

        db.Projects.AddRange(
            new Project { Title = "Smartphone Troubleshooting Knowledge Base", Description = "Document recurring smartphone support issues, symptoms, diagnosis and authorized resolution paths.", WeekNumber = 3, DueDate = DateTime.UtcNow.Date.AddDays(14) },
            new Project { Title = "Device Management Troubleshooting Guide", Description = "Create a structured guide for enrollment, synchronization and device-status troubleshooting.", WeekNumber = 6, DueDate = DateTime.UtcNow.Date.AddDays(35) },
            new Project { Title = "Mobile Cybersecurity Checklist", Description = "Produce a support-facing mobile security and customer-data protection checklist.", WeekNumber = 8, DueDate = DateTime.UtcNow.Date.AddDays(49) },
            new Project { Title = "Engineering Escalation Framework", Description = "Build a complete evidence-first engineering escalation template and workflow.", WeekNumber = 10, DueDate = DateTime.UtcNow.Date.AddDays(63) },
            new Project { Title = "Final Smartphone Incident Investigation", Description = "Complete an end-to-end authorized Credlock smartphone incident investigation.", WeekNumber = 12, DueDate = DateTime.UtcNow.Date.AddDays(77) }
        );

        db.KnowledgeBaseArticles.AddRange(
            new KnowledgeBaseArticle { Category = "SOP", Title = "Device Enrollment", Content = "Verify customer and device identity, confirm prerequisites, capture evidence and escalate enrollment failures with complete diagnostics." },
            new KnowledgeBaseArticle { Category = "SOP", Title = "Identity Verification", Content = "Use approved identity-verification procedures and minimize exposure of customer information." },
            new KnowledgeBaseArticle { Category = "SOP", Title = "Device Lock & Unlock", Content = "Confirm account and device status, document the issue and use only authorized management actions." },
            new KnowledgeBaseArticle { Category = "SOP", Title = "Network Troubleshooting", Content = "Check connectivity, application reachability, synchronization and relevant evidence before escalation." },
            new KnowledgeBaseArticle { Category = "Cybersecurity", Title = "Customer Data Protection", Content = "Apply least privilege, data minimization and secure handling of customer information." },
            new KnowledgeBaseArticle { Category = "Cybersecurity", Title = "Incident Response", Content = "Preserve evidence, contain authorized risks, document actions and escalate security incidents appropriately." }
        );

        db.Notifications.Add(new Notification { UserAccountId = internUser.Id, Title = "Welcome to Credlock SIWES", Message = "Your 12-week learning workspace is ready. Start with Week 1." });
        await db.SaveChangesAsync();
    }
}
