using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams
    {
        private int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize {
            get => pageSize;
            set => pageSize = value > maxPageSize ? maxPageSize : value;
        }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;
        public string? Gender { get; set; }
        public string? CurrentUser { get; set; }
        public string OrderBy { get; set; } = "lastActive";
    }
}