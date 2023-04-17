using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _reposetories;

        public UnitOfWork(StoreContext context)
        {
            this._context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if(_reposetories == null) _reposetories = new Hashtable();

            var type = typeof(TEntity).Name;

            if (_reposetories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.
                    MakeGenericType(typeof(TEntity)), _context);

                _reposetories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>)_reposetories[type];
        }
    }
}
