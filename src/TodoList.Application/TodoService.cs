using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Dtos.Todo;
using TodoList.Services;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
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
        
        public async Task DeleteAsync(Guid id)
        {
            var todo = await _todoRepository.GetAsync(t => t.Id == id);
            if (todo is null)
            {
                throw new EntityNotFoundException("Todo not found");
            }
            await _todoRepository.DeleteAsync(t => t.Id == id);
        }
    }
}