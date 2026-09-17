using CredlockInternPortal.Models;
using Microsoft.EntityFrameworkCore;

namespace CredlockInternPortal.Data;

public class PortalDbContext(DbContextOptions<PortalDbContext> options) : DbContext(options)
{
    public DbSet<UserAccount> Users => Set<UserAccount>();
    public DbSet<InternProfile> InternProfiles => Set<InternProfile>();
    public DbSet<AttendanceRecord> Attendance => Set<AttendanceRecord>();
    public DbSet<TrainingWeek> TrainingWeeks => Set<TrainingWeek>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<LearningProgress> LearningProgress => Set<LearningProgress>();
    public DbSet<Quiz> Quizzes => Set<Quiz>();
    public DbSet<QuizQuestion> QuizQuestions => Set<QuizQuestion>();
    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();
    public DbSet<DailyAssessment> DailyAssessments => Set<DailyAssessment>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectSubmission> ProjectSubmissions => Set<ProjectSubmission>();
    public DbSet<SupervisorEvaluation> SupervisorEvaluations => Set<SupervisorEvaluation>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<KnowledgeBaseArticle> KnowledgeBaseArticles => Set<KnowledgeBaseArticle>();
    public DbSet<SupportTicket> SupportTickets => Set<SupportTicket>();
    public DbSet<EngineeringEscalation> EngineeringEscalations => Set<EngineeringEscalation>();
    public DbSet<Achievement> Achievements => Set<Achievement>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserAccount>().HasIndex(x => x.Email).IsUnique();
        modelBuilder.Entity<InternProfile>().HasIndex(x => x.InternId).IsUnique();
        modelBuilder.Entity<TrainingWeek>().HasIndex(x => x.WeekNumber).IsUnique();
        modelBuilder.Entity<LearningProgress>().HasIndex(x => new { x.InternProfileId, x.LessonId }).IsUnique();
        modelBuilder.Entity<QuizQuestion>().HasIndex(x => new { x.QuizId, x.Id });
        modelBuilder.Entity<InternProfile>().HasOne(x => x.UserAccount).WithOne().HasForeignKey<InternProfile>(x => x.UserAccountId).OnDelete(DeleteBehavior.Cascade);
    }
}
