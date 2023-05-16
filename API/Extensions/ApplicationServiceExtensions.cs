using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder) 
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(connectionString));

            builder.Services.AddScoped<ITokenService, TokenService>();

            return builder;
        }
    }
}