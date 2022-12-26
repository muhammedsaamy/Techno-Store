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
        public ProductWithTypesAndBrandsSpecification(string sort, int? brandId, int? typeId) :
            base (x=>
            (!brandId.HasValue || x.ProductBrandId==brandId) &&
            (!typeId.HasValue || x.ProductTypeId==typeId)
            )
        {
            AddInclude(p=>p.ProductType);
            AddInclude(p => p.ProductBrand);
            AddOrderBy(x=>x.Name);

            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
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
