using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] 
        [MinLength(3, ErrorMessage ="The field City's minimum length is '3'")]
        public string Username { get; set; }

        [Required]
        [MinLength(2, ErrorMessage ="The field City's minimum length is '2'")]
        public string KnownAs { get; set; }
        [Required] public string Gender { get; set; }
        [Required(ErrorMessage = "The date field is required")] public DateTime DateOfBirth { get; set; }

        [Required] 
        [MinLength(2, ErrorMessage ="The field City's minimum length is '2'")]
        public string City { get; set; }
        
        [Required]
        [MinLength(2, ErrorMessage ="The field Counrty's minimum length is '2'")]
        public string Country { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage ="The field Password's minimum length is '4' and maximum length is '4'")]
        public string password { get; set; }
    }
}