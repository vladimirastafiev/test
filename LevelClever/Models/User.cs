using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace LevelClever.Models
{
    public class User: IdentityUser
    {
        [Required]
        [MaxLength(256)]
        public string LinkPhoto { get; set; }
        //[Required]
        //[Display(Name = "Прізвище")]
        //public string Surname { get; set; }

        //[Required]
        //[Display(Name = "Ім'я")]
        //public string Name { get; set; }

        //[Display(Name = "По батькові")]
        //public string Midname { get; set; }

        //[Required]
        //[Display(Name = "Дата народження")]
        //public DateTime Birthday { get; set; }
    }
}
