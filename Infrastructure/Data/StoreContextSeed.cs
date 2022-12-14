//using Core.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.Json;
//using System.Threading.Tasks;

//namespace Infrastructure.Data
//{
//    public class StoreContextSeed
//    {
//        public static async Task SeedAsync(StoreContext context)
//        {
//            try 
//            {
//                if (!context.ProductBrands.Any())
//                {
//                    var brandsData =
//                        File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
//                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
//                    foreach (var item in brands)
//                    {
//                        context.ProductBrands.Add(item);
//                    }
//                    await context.SaveChangesAsync();
//                }
//                if (!context.Producs.Any())
//                {
//                    var typesData =
//                        File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
//                    var types = JsonSerializer.Deserialize<List<ProductsType>>(typesData);
//                    foreach (var item in types)
//                    {
//                        context.Products.Add(item);
//                    }
//                    await context.SaveChangesAsync();
//                }
//                if (!context.Products.Any())
//                {
//                    var ProductsData =
//                        File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
//                    var products = JsonSerializer.Deserialize<List<ProductsType>>(ProductsData);
//                    foreach (var item in products)
//                    {
//                        context.Products.Add(item);
//                    }
//                    await context.SaveChangesAsync();
//                }

//            }
//            catch(Exception ex) 
//            {

//            }
//        }
//    }
//}
