using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TodoList.Configurations
{
    public class TodoConfiguration : IEntityTypeConfiguration<Todo>
    {
        public void Configure(EntityTypeBuilder<Todo> builder)
        {
            builder.ToTable("Todos");
            
            // Properties
            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName(nameof(Todo.Title));
                
            builder.Property(t => t.Description)
                .HasMaxLength(500)
                .HasColumnName(nameof(Todo.Description));
            
            builder.Property(t => t.Status)
                .HasConversion<string>()
                .HasDefaultValue(TodoStatus.Pending)
                .HasColumnName(nameof(Todo.Status));
                
            builder.Property(t => t.Priority)
                .HasConversion<string>()
                .HasColumnName(nameof(Todo.Priority));
                
            builder.Property(t => t.DueDate)
                .HasColumnName(nameof(Todo.DueDate));
                
            builder.Property(t => t.CreatedDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName(nameof(Todo.CreatedDate));

            builder.Property(t => t.LastModifiedDate)
                .HasColumnName(nameof(Todo.LastModifiedDate));

            // Indexes
            builder.HasIndex(t => t.Status);
            builder.HasIndex(t => t.Priority);
            builder.HasIndex(t => t.DueDate);
        }
    }
}
