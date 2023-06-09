using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if(await context.Users.AnyAsync()) return;
            
            var usersDataJson = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var usersObjects = JsonSerializer.Deserialize<List<AppUser>>(usersDataJson);
            foreach (var user in usersObjects)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();

                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            context.SaveChangesAsync();
        }
    }
}