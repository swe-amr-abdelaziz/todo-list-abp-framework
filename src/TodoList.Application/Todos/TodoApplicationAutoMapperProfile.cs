using AutoMapper;
using TodoList.Dtos.Todo;

namespace TodoList.Todos
{
    public class TodoApplicationAutoMapperProfile: Profile
    {
        public TodoApplicationAutoMapperProfile()
        {
            CreateMap<Todo, TodoDto>();
        }
    }
}
