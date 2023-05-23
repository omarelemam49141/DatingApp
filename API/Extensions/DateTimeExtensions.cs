using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime DateOfBirth)
        {
            var today = DateTime.Now;
            int age = today.Year - DateOfBirth.Year ;

            if (DateOfBirth.Date > today.AddYears(-age)) age--;

            return age;
        } 
    }
}