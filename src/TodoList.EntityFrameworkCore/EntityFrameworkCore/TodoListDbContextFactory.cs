using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TodoList.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class TodoListDbContextFactory : IDesignTimeDbContextFactory<TodoListDbContext>
{
    public TodoListDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        TodoListEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<TodoListDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new TodoListDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../TodoList.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
