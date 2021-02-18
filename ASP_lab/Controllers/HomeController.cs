using ASP_lab.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace ASP_lab.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Matrix()
        {
            Random random = new Random();
            double[][] matrix = new double[5][];
            
            for (int i = 0; i < 5; i++)
            {
                matrix[i] = new double[5];
                for (int j = 0; j < 5; j++)
                {
                    matrix[i][j] = Convert.ToDouble(random.Next(-100, 100) / 10d);
                }
            }
            double max = matrix[0][0], max1 = matrix[0][0], max2 = matrix[0][0];
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    if (i + j == 4 && matrix[i][j] > max) max = matrix[i][j];
                    else if (i + j == 3 && matrix[i][j] > max1) max1 = matrix[i][j];
                    else if (i + j == 5 && matrix[i][j] > max2) max2 = matrix[i][j];
                }
            }
            return View(new MatrixModel(matrix, Math.Round(max, 2), Math.Round(max1, 2), Math.Round(max2, 2)));
        }

        public IActionResult Array()
        {
            Random random = new Random();
            int[] array = new int[15];
            List<int> indexes = new List<int>();
            for (int j = 0; j < 15; j++)
            {
                array[j] = random.Next(-25, 25);
            } 
            for (int i = 0; i < 14; i++)
            {
                for (int j = i + 1; j < 15; j++)
                {
                    if (Math.Abs(array[i] - array[j]) == 2)
                    {
                        indexes.Add(i);
                        indexes.Add(j);
                    }
                }
            }
            return View(new ArrayModel(array, indexes));
        }
    }
}
