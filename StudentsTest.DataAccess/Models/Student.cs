using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentsTest.DataAccess.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(255, ErrorMessage = "Escribe 255 carácteres máximo")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "El cumpleaños es obligatorio")]
        [ValidateStudentAge]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "El curso es obligatorio")]
        public string? Course { get; set; }
        public bool Status { get; set; }

        internal class ValidateStudentAge : ValidationAttribute
        {
            protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
            {
                DateTime.TryParse(value?.ToString(), out DateTime birthDate);

                int studentAge = DateTime.Today.Year - birthDate.Year;


                if (studentAge > 16)
                    return ValidationResult.Success;

                return new ValidationResult("El estudiante debe tener al menos 16 años de edad");
            }
        }
    }
}
