using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<MemberDto>> GetAllUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<MemberDto> GetUserByUsernameAsync(string username);
        Task<bool> SaveAllAsync();
    }
}