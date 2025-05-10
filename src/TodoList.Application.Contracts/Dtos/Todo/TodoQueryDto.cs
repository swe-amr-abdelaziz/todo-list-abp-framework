namespace TodoList.Dtos.Todo
{
    public class TodoQueryDto
    {
        public TodoStatus? Status { get; set; }
        public TodoPriority? Priority { get; set; }
    }
}
