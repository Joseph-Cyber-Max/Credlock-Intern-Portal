using System.Security.Cryptography;
using System.Text;
using CredlockInternPortal.Models;

namespace CredlockInternPortal.Services;

public class AuthService
{
    private readonly List<UserAccount> _users =
    [
        new UserAccount { Id = 1, FullName = "System Administrator", Email = "admin@credlock.africa", PasswordHash = HashPassword("Admin@123"), Role = UserRole.Admin },
        new UserAccount { Id = 2, FullName = "HR Administrator", Email = "hr@credlock.africa", PasswordHash = HashPassword("Hr@123"), Role = UserRole.HR },
        new UserAccount { Id = 3, FullName = "SIWES Supervisor", Email = "supervisor@credlock.africa", PasswordHash = HashPassword("Supervisor@123"), Role = UserRole.Supervisor }
    ];

    public UserAccount? Authenticate(string email, string password)
    {
        var user = _users.FirstOrDefault(x => x.Email.Equals(email.Trim(), StringComparison.OrdinalIgnoreCase) && x.IsActive);
        return user is not null && VerifyPassword(password, user.PasswordHash) ? user : null;
    }

    public static string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(16);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 120000, HashAlgorithmName.SHA256, 32);
        return $"PBKDF2-SHA256$120000${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
    }

    public static bool VerifyPassword(string password, string stored)
    {
        var parts = stored.Split('$');
        if (parts.Length != 4 || parts[0] != "PBKDF2-SHA256" || !int.TryParse(parts[1], out var iterations)) return false;
        var salt = Convert.FromBase64String(parts[2]);
        var expected = Convert.FromBase64String(parts[3]);
        var actual = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, HashAlgorithmName.SHA256, expected.Length);
        return CryptographicOperations.FixedTimeEquals(actual, expected);
    }
}
