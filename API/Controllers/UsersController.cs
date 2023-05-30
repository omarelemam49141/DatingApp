using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BasicApiController
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers([FromQuery] UserParams userParams) 
        {
            var username = User.GetUsername();

            userParams.CurrentUser = username;

            if(string.IsNullOrEmpty(userParams.Gender)) 
            {
                var user = await _userRepository.GetAppUserByUsernameAsync(username);
                userParams.Gender = user.Gender == "female" ? "male" : "female";
            }

            var users = await _userRepository.GetAllUsersAsync(userParams);

            Response.AddPaginationHeader(users.PageNumber, users.PageSize, users.PagesCount, users.ItemsCount);
            
            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username) 
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto) 
        {
            var user = await _userRepository.GetAppUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();
            
            return BadRequest("Can't update the user");
        }

        //Adding photos end point
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userRepository.GetAppUserByUsernameAsync(User.GetUsername());
            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem Adding Photo");
        }

        //Set Main Photo
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRepository.GetAppUserByUsernameAsync(User.GetUsername());

            var photoToUpdate = user.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photoToUpdate.IsMain) return BadRequest("This photo is already the main photo");

            var mainPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
            if (mainPhoto != null) mainPhoto.IsMain = false;
            photoToUpdate.IsMain = true;

            if (await _userRepository.SaveAllAsync()) return NoContent();
            
            return BadRequest("Failed to set main photo");
        }

        //Delete Photo that is not main
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId) {
            var user = await _userRepository.GetAppUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.SingleOrDefault(p => p.Id == photoId);

            if(photo == null) return NotFound();
            if(photo.IsMain) return BadRequest("You can't delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if(await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}