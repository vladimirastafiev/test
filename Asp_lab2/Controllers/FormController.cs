using Asp_lab2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asp_lab2.Controllers
{
    public class FormController : Controller
    {
        public IActionResult System()
        {
            return View(new SystemModel());
        }
    }
}
