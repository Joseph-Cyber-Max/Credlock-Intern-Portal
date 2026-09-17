using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class DashboardModel : PageModel
{
    public string FullName { get; private set; } = "";
    public string FirstName => string.IsNullOrWhiteSpace(FullName) ? "there" : FullName.Split(' ')[0];
    public string Role { get; private set; } = "";

    public IActionResult OnGet()
    {
        FullName = HttpContext.Session.GetString("FullName") ?? "";
        Role = HttpContext.Session.GetString("Role") ?? "";
        if (string.IsNullOrEmpty(FullName)) return RedirectToPage("/Login");
        return Page();
    }
}
