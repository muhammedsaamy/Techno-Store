using API.Extensions;
using API.Helpers;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);



//Add AutoMapper

builder.Services.AddAutoMapper(typeof(MappingProfiles));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<StoreContext>(options => options
.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDbContext<AppIdentityDbContext>(options => options
.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection")));


//Redis
builder.Services.AddScoped<IConnectionMultiplexer>(c =>
{
    var configuration = ConfigurationOptions.Parse(builder
       .Configuration.GetConnectionString("Redis"),true);
    return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddApplicationServices();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerdocumentation();

//add Cors
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
     {
         policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
     });
});

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var loggerFactory = service.GetRequiredService<ILoggerFactory>();
    try
    {
        var context=service.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(context, loggerFactory);

        var userManager = service.GetRequiredService<UserManager<AppUser>>();
        var identityContext = service.GetRequiredService<AppIdentityDbContext>();
        await identityContext.Database.MigrateAsync();
        await AppIdentityDbContextSeed.SeedUserAsync(userManager);
    }
    catch (Exception ex)
    {
        var logger = builder.Logging.Services.BuildServiceProvider().GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured during migration");

    }
}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();


//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseHttpsRedirection();

app.UseRouting();

app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseSwaggerDocumentation();

app.MapControllers();

app.Run();
