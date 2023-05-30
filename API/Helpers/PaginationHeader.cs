using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(int pageNumber, int pageSize, int pagesCount, int itemsCount)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            PagesCount = pagesCount;
            ItemsCount = itemsCount;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int PagesCount { get; set; }
        public int ItemsCount { get; set; }
    }
}