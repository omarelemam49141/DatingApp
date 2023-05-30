using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<PagedList<MemberDto>> GetAllUsersAsync(UserParams userParams);
        Task<AppUser> GetUserByIdAsync(int id);
        Task<MemberDto> GetUserByUsernameAsync(string username);
        Task<AppUser> GetAppUserByUsernameAsync(string username);
        Task<bool> SaveAllAsync();
    }
}