using System;
using Volo.Abp.Domain.Entities;

namespace TodoList
{
    public sealed class Todo : BasicAggregateRoot<Guid>
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public TodoStatus Status { get; set; }
        public TodoPriority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? LastModifiedDate { get; set; }
    }
    
    public enum TodoStatus
    {
        Pending,
        InProgress,
        Completed
    }
    
    public enum TodoPriority
    {
        Low,
        Medium,
        High
    }
}
