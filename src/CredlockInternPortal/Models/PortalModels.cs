namespace CredlockInternPortal.Models;

public enum UserRole
{
    Admin,
    HR,
    Supervisor,
    Intern
}

public class UserAccount
{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public UserRole Role { get; set; }
    public bool IsActive { get; set; } = true;
}

public class InternProfile
{
    public int Id { get; set; }
    public string InternId { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Institution { get; set; } = "";
    public string Department { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Supervisor { get; set; } = "";
    public bool IsActive { get; set; } = true;
}

public class AttendanceRecord
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public DateTime Date { get; set; }
    public DateTime? CheckIn { get; set; }
    public DateTime? CheckOut { get; set; }
    public string Status { get; set; } = "Present";
}

public class LearningItem
{
    public int Id { get; set; }
    public int Week { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int Progress { get; set; }
}

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public DateTime DueDate { get; set; }
    public string Status { get; set; } = "Pending";
    public string Priority { get; set; } = "Normal";
}
