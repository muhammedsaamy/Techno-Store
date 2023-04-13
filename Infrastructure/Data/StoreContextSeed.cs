using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
//using log4net;
//using log4net.Config;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        // private static readonly ILog logger =
        //LogManager.GetLogger(typeof(StoreContextSeed));
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {

            try
            {

                if (!context.ProductBrands.Any())
                {
                    var brandsData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.ProductsTypes.Any())
                {
                    var typesData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductsType>>(typesData);
                    foreach (var item in types)
                    {
                        //context.ChangeTracker.Clear();

                        context.ProductsTypes.Add(item);
                    }
                    await context.SaveChangesAsync();
                }




                if (!context.Products.Any())
                {

                    var ProductsData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(ProductsData);
                    foreach (var item in products)
                    {
                        //context.ChangeTracker.Clear();
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.deliveryMethods.Any())
                {

                    var dmData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                    foreach (var item in methods)
                    {
                        //context.ChangeTracker.Clear();
                        context.deliveryMethods.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
                //logger.Error(ex.Message);

            }
        }
    }
}
