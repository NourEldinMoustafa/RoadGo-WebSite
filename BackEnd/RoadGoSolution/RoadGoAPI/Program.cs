using Microsoft.EntityFrameworkCore;
using RoadGoAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var conStr = builder.Configuration.GetConnectionString("DefualtConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(conStr)
);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

    app.UseSwagger();
    app.UseSwaggerUI();


app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowAnyOrigin");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
