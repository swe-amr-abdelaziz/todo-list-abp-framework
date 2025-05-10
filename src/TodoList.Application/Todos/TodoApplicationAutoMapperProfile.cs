using AutoMapper;
using TodoList.Dtos.Todo;

namespace TodoList.Todos
{
    public class TodoApplicationAutoMapperProfile: Profile
    {
        public TodoApplicationAutoMapperProfile()
        {
            CreateMap<Todo, TodoDto>();
            CreateMap<CreateTodoDto, Todo>();
            CreateMap<UpdateTodoDto, Todo>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
