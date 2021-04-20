using LevelClever.Models;
using LevelClever.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System;
using System.Text;

namespace LevelClever.Controllers
{
    public class AccountController : Controller
    {
        readonly UserManager<User> _userManager;
        readonly SignInManager<User> _signInManager;
        readonly IWebHostEnvironment _appEnvironment;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IWebHostEnvironment appEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appEnvironment = appEnvironment;
        }

        [HttpGet]
        public IActionResult Register()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User {
                    //Surname = model.Surname,
                    //Name = model.Name,
                    //Midname = model.Midname,
                    //Birthday = new DateTime(model.Year, model.Month, model.Day),
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    UserName = model.Email,
                    LinkPhoto = "/Files/img/" + Convert.ToBase64String(MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(model.UploadedImage.FileName)))
                };
                IdentityResult result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    AddFile(model.UploadedImage);
                    await _userManager.AddToRoleAsync(user, model.Role);
                    await _signInManager.SignInAsync(user, false);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View(model);
        }

        async void AddFile(IFormFile uploadedFile)
        {
            if (uploadedFile != null)
            {
                string path = "/Files/img/" + Convert.ToBase64String(MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(uploadedFile.FileName)));
                using var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create);
                await uploadedFile.CopyToAsync(fileStream);
            }
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View(new LoginViewModel());
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Home");
                }
                else ModelState.AddModelError("", "Неправильный логин и (или) пароль");
            }
            return View(model);
        }

        
    }
}
