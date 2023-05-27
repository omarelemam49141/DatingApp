using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.MainPhotoUrl, opt => opt.MapFrom(
                src => src.Photos.SingleOrDefault(x => x.IsMain).Url
            ))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(
                src => src.DateOfBirth.CalculateAge()
            ));
            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}