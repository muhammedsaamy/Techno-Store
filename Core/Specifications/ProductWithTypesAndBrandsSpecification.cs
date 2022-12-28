using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandsSpecification(ProductSpecParams productParams) :
            base (x=>
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) && 
            (!productParams.BrandId.HasValue || x.ProductBrandId== productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId== productParams.TypeId)
            )
        {
            AddInclude(p=>p.ProductType);
            AddInclude(p => p.ProductBrand);
            AddOrderBy(x=>x.Name);
            ApplyPaging(productParams.pageSize * (productParams.pageIndex-1),productParams.pageSize);
            if (!string.IsNullOrEmpty(productParams.sort))
            {
                switch (productParams.sort)
                {
                    case "priceAsc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "priceDecs":
                        AddOrderByDescending(x => x.Price);
                        break;
                        default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductWithTypesAndBrandsSpecification(int id) : base(p=>p.Id==id)
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductBrand);

        }
    }
}
