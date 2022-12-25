using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity :BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery , ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }
            if (spec.OrdreBy != null)
            {
                query = query.OrderBy(spec.OrdreBy);
            }
            if (spec.OrdreByDescending != null)
            {
                query = query.OrderByDescending(spec.OrdreByDescending);
            }
            query =spec.Includes.Aggregate(query , (current , include) => current.Include(include));
            return query;
        }
    }
}
