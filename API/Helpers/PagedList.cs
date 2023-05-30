using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int pageNumber, int pageSize, int itemsCount)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            ItemsCount = itemsCount;
            PagesCount = (int) Math.Ceiling(ItemsCount / (double) PageSize);
            AddRange(items);           
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int PagesCount { get; set; }
        public int ItemsCount { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize) {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, pageNumber, pageSize, count);

        }
    }
}