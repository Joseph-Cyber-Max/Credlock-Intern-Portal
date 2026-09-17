using CredlockInternPortal.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CredlockInternPortal.Pages;

public class LoginModel : PageModel
{
    private readonly AuthService _auth;
    public LoginModel(AuthService auth) => _auth = auth;

    [BindProperty] public string Email { get; set; } = "";
    [BindProperty] public string Password { get; set; } = "";
    public string? ErrorMessage { get; set; }

    public void OnGet() { }

    public IActionResult OnPost()
    {
        var user = _auth.Authenticate(Email, Password);
        if (user is null)
        {
            ErrorMessage = "Invalid email or password.";
            return Page();
        }

        HttpContext.Session.SetInt32("UserId", user.Id);
        HttpContext.Session.SetString("FullName", user.FullName);
        HttpContext.Session.SetString("Role", user.Role.ToString());
        return RedirectToPage("/Dashboard/Index");
    }
}
