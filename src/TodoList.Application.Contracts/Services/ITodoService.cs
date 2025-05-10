using System.Collections.Generic;
using System.Threading.Tasks;
using TodoList.Dtos.Todo;
using Volo.Abp.Application.Services;

namespace TodoList.Services
{
    public interface ITodoService : IApplicationService
    {
        Task<List<TodoDto>> GetListAsync();
    }
}