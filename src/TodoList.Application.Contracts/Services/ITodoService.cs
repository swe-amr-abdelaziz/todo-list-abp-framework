using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoList.Dtos.Todo;
using Volo.Abp.Application.Services;

namespace TodoList.Services
{
    public interface ITodoService : IApplicationService
    {
        Task<List<TodoDto>> GetListAsync();
        Task<TodoDto> GetAsync(Guid id);
        Task<TodoDto> CreateAsync(CreateTodoDto todoDto);
        Task<TodoDto> UpdateAsync(Guid id, UpdateTodoDto todoDto);
        Task<TodoStatus> UpdateStatusAsync(Guid id);
        Task DeleteAsync(Guid id);
    }
}