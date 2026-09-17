using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CredlockInternPortal.Pages;

public class IndexModel : PageModel
{
    public IActionResult OnGet()
    {
        return HttpContext.Session.GetString("UserId") is null
            ? RedirectToPage("/Login")
            : RedirectToPage("/Dashboard/Index");
    }
}
