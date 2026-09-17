namespace CredlockInternPortal.Models;

public enum UserRole { Admin, HR, Supervisor, Intern }

public class UserAccount
{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public UserRole Role { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class InternProfile
{
    public int Id { get; set; }
    public string InternId { get; set; } = "";
    public int UserAccountId { get; set; }
    public string Institution { get; set; } = "";
    public string Department { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Supervisor { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public UserAccount? UserAccount { get; set; }
}

public class AttendanceRecord
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public DateTime Date { get; set; }
    public DateTime? CheckIn { get; set; }
    public DateTime? CheckOut { get; set; }
    public string Status { get; set; } = "Present";
    public string Notes { get; set; } = "";
}

public class TrainingWeek
{
    public int Id { get; set; }
    public int WeekNumber { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public List<Lesson> Lessons { get; set; } = [];
}

public class Lesson
{
    public int Id { get; set; }
    public int TrainingWeekId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int SortOrder { get; set; }
    public TrainingWeek? TrainingWeek { get; set; }
}

public class LearningProgress
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public int LessonId { get; set; }
    public bool Completed { get; set; }
    public DateTime? CompletedAt { get; set; }
}

public class Quiz
{
    public int Id { get; set; }
    public int TrainingWeekId { get; set; }
    public string Title { get; set; } = "";
    public int PassMark { get; set; } = 60;
}

public class QuizQuestion
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public string QuestionText { get; set; } = "";
    public string OptionA { get; set; } = "";
    public string OptionB { get; set; } = "";
    public string OptionC { get; set; } = "";
    public string OptionD { get; set; } = "";
    public string CorrectOption { get; set; } = "A";
    public string Explanation { get; set; } = "";
}

public class QuizAttempt
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public int InternProfileId { get; set; }
    public int Score { get; set; }
    public bool Passed { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}

public class DailyAssessment
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public DateTime AssessmentDate { get; set; }
    public string TechnicalTask { get; set; } = "";
    public string Troubleshooting { get; set; } = "";
    public string RootCause { get; set; } = "";
    public string CybersecurityIssue { get; set; } = "";
    public string Resolution { get; set; } = "";
    public string Escalation { get; set; } = "";
    public string Learning { get; set; } = "";
    public int Score { get; set; }
}

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int WeekNumber { get; set; }
    public DateTime DueDate { get; set; }
}

public class ProjectSubmission
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public int InternProfileId { get; set; }
    public string SubmissionText { get; set; } = "";
    public string FilePath { get; set; } = "";
    public int? Score { get; set; }
    public string Feedback { get; set; } = "";
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}

public class SupervisorEvaluation
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public int WeekNumber { get; set; }
    public int Score { get; set; }
    public string Comments { get; set; } = "";
    public DateTime EvaluatedAt { get; set; } = DateTime.UtcNow;
}

public class Notification
{
    public int Id { get; set; }
    public int? UserAccountId { get; set; }
    public string Title { get; set; } = "";
    public string Message { get; set; } = "";
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class KnowledgeBaseArticle
{
    public int Id { get; set; }
    public string Category { get; set; } = "";
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public bool IsPublished { get; set; } = true;
}

public class SupportTicket
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public string Category { get; set; } = "";
    public string Subject { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "Open";
    public string Priority { get; set; } = "Normal";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class EngineeringEscalation
{
    public int Id { get; set; }
    public int? SupportTicketId { get; set; }
    public string Issue { get; set; } = "";
    public string Evidence { get; set; } = "";
    public string ExpectedResult { get; set; } = "";
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Achievement
{
    public int Id { get; set; }
    public int InternProfileId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public DateTime AwardedAt { get; set; } = DateTime.UtcNow;
}

public class AuditLog
{
    public int Id { get; set; }
    public int? UserAccountId { get; set; }
    public string Action { get; set; } = "";
    public string Entity { get; set; } = "";
    public string Details { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
