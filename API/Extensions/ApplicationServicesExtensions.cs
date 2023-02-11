using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices( this IServiceCollection Services)
        {
            //Add scoped from services to pass a repo

            Services.AddScoped<IProductRepository, ProductRepository>();
            Services.AddScoped<IBasketRepository, BasketRepository>();

            Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            Services.Configure<ApiBehaviorOptions>(
            option =>
            {
                option.InvalidModelStateResponseFactory = ActionContext =>
                {
                    var errors = ActionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);

                };
            });
            return Services;
        }
    }
}
