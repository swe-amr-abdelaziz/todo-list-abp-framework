using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Dtos.Todo;
using TodoList.Services;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace TodoList
{
    public class TodoService(IRepository<Todo, Guid> todoRepository) : ApplicationService, ITodoService
    {
        private readonly IRepository<Todo, Guid> _todoRepository = todoRepository;
        
        public async Task<List<TodoDto>> GetListAsync()
        {
            var todos = await _todoRepository.GetListAsync();
            return todos
                .Select((todo) => ObjectMapper.Map<Todo, TodoDto>(todo))
                .ToList();
        }
    }
}