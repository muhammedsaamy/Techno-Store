using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxpageSize = 50;
        public int pageIndex { get; set; } = 1;
        private int _pageSize = 6;
        public int pageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxpageSize ? MaxpageSize : value);
        }
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string sort { get; set; }
        private string _search;
        public string Search 
        { 
            get => _search;
            set => _search = value.ToLower();
        }

    }
}
