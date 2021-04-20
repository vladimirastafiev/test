using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace LevelClever.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Не вибрана роль")]
        [Display(Name = "Роль")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Поле Email є обов'язковим для заповнення")]
        [MaxLength(256, ErrorMessage = "Довжина повинна бути не більше 256 символів")]
        [EmailAddress(ErrorMessage = "Некоректна адреса")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле Мобільний телефон є обов'язковим для заповнення")]
        [MaxLength(32, ErrorMessage = "Довжина повинна бути не більше 32 символів")]
        [Phone(ErrorMessage = "Некоректний номер")]
        [Display(Name = "Мобільний телефон")]
        public string PhoneNumber { get; set; }

        [Required (ErrorMessage = "Поле Пароль є обов'язковим для заповнення.")]
        [Display(Name = "Пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required (ErrorMessage = "Поле Підтвердіть пароль є обов'язковим для заповнення.")]
        [Compare("Password", ErrorMessage = "Паролі не співпадають.")]
        [Display(Name = "Підтвердіть пароль")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; }

        [Required]
        public IFormFile UploadedImage { get; set; }

        //[Required]
        //[Display(Name = "Прізвище")]
        //public string Surname { get; set; }

        //[Required]
        //[Display(Name = "Ім'я")]
        //public string Name { get; set; }

        //[Display(Name = "По батькові")]
        //public string Midname { get; set; }

        //[Required]
        //[Display(Name = "День")]
        //public int Day { get; set; }

        //[Required]
        //[Display(Name = "Місяць")]
        //public int Month { get; set; }

        //[Required]
        //[Display(Name = "Рік")]
        //public int Year { get; set; }


    }
}
