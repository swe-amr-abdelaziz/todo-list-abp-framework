namespace TodoList.Dtos.Todo
{
    public class TodoQueryDto
    {
        public TodoStatus? Status { get; set; }
        public TodoPriority? Priority { get; set; }
        public TodoSortBy? SortBy { get; set; }
        public bool? SortDescending { get; set; }
    }
    
    public enum TodoSortBy
    {
        Title,
        Description,
        Status,
        Priority,
        DueDate,
    }
}
