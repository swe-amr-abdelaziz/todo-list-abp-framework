using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Dtos.Todo;
using TodoList.Services;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Validation;

namespace TodoList
{
    public class TodoService(IRepository<Todo, Guid> todoRepository) : ApplicationService, ITodoService
    {
        private readonly IRepository<Todo, Guid> _todoRepository = todoRepository;
        
        public async Task<List<TodoDto>> GetListAsync(TodoQueryDto todoQueryDto)
        {
            var todos = await _getListWithQueriesAsync(todoQueryDto);
            return todos
                .Select((todo) => ObjectMapper.Map<Todo, TodoDto>(todo))
                .ToList();
        }
        
        public async Task<TodoDto> GetAsync(Guid id)
        {
            var todo = await _todoRepository.GetAsync(t => t.Id == id);
            if (todo is null)
            {
                throw new EntityNotFoundException("Todo not found");
            }
            return ObjectMapper.Map<Todo, TodoDto>(todo);
        }

        public async Task<TodoDto> CreateAsync(CreateTodoDto todoDto)
        {
            todoDto.Normalize();
            var mappedTodo = ObjectMapper.Map<CreateTodoDto, Todo>(todoDto);
            var todo = await _todoRepository.InsertAsync(mappedTodo, true);
            return ObjectMapper.Map<Todo, TodoDto>(todo);
        }

        public async Task<TodoDto> UpdateAsync(Guid id, UpdateTodoDto todoDto)
        {
            var todo = await _todoRepository.GetAsync(t => t.Id == id);
            if (todo is null)
            {
                throw new EntityNotFoundException("Todo not found");
            }
            todoDto.Normalize();

            ObjectMapper.Map(todoDto, todo);
            todo.LastModifiedDate = DateTime.UtcNow;
            await _todoRepository.UpdateAsync(todo);
            
            return ObjectMapper.Map<Todo, TodoDto>(todo);
        }
        
        public async Task<TodoStatus> UpdateStatusAsync(Guid id)
        {
            var todo = await _todoRepository.GetAsync(t => t.Id == id);
            if (todo is null)
            {
                throw new EntityNotFoundException("Todo not found");
            }
            todo.Status = todo.Status switch
            {
                TodoStatus.Pending => TodoStatus.InProgress,
                TodoStatus.InProgress => TodoStatus.Completed,
                TodoStatus.Completed => throw new AbpValidationException("Todo is already completed"),
                _ => throw new AbpValidationException("Todo status is unknown"),
            };
            
            await _todoRepository.UpdateAsync(todo);
            return todo.Status;
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

        private async Task<List<Todo>> _getListWithQueriesAsync(TodoQueryDto todoQueryDto)
        {
            var queryable = await _todoRepository.GetQueryableAsync();
            queryable = _getListWithFilterQueries(queryable, todoQueryDto);
            if (todoQueryDto.SortBy is not null)
            {
                queryable = _getListWithSortQueries(queryable, todoQueryDto);
            }
            return await AsyncExecuter.ToListAsync(queryable);
        }

        private static IQueryable<Todo> _getListWithFilterQueries(IQueryable<Todo> queryable,
            TodoQueryDto todoQueryDto)
        {
            if (todoQueryDto.Status is not null)
            {
                queryable = queryable.Where(t => t.Status == todoQueryDto.Status);
            }
            if (todoQueryDto.Priority is not null)
            {
                queryable = queryable.Where(t => t.Priority == todoQueryDto.Priority);
            }
            return queryable;
        }

        private static IQueryable<Todo> _getListWithSortQueries(IQueryable<Todo> queryable,
            TodoQueryDto todoQueryDto)
        {
            if (todoQueryDto.SortDescending is null or false)
            {
                queryable = todoQueryDto.SortBy switch
                {
                    TodoSortBy.Title => queryable.OrderBy(t => t.Title),
                    TodoSortBy.Description => queryable.OrderBy(t => t.Description),
                    TodoSortBy.Status => queryable.AsEnumerable()
                        .OrderBy(t => (int)Enum.Parse<TodoStatus>($"{t.Status}"))
                        .AsQueryable(),
                    TodoSortBy.Priority => queryable.AsEnumerable()
                        .OrderBy(t => (int)Enum.Parse<TodoPriority>($"{t.Priority}"))
                        .AsQueryable(),
                    TodoSortBy.DueDate => queryable.OrderBy(t => t.DueDate),
                    _ => queryable,
                };
            }
            else
            {
                queryable = todoQueryDto.SortBy switch
                {
                    TodoSortBy.Title => queryable.OrderByDescending(t => t.Title),
                    TodoSortBy.Description => queryable.OrderByDescending(t => t.Description),
                    TodoSortBy.Status => queryable.AsEnumerable()
                        .OrderByDescending(t => (int)Enum.Parse<TodoStatus>($"{t.Status}"))
                        .AsQueryable(),
                    TodoSortBy.Priority => queryable.AsEnumerable()
                        .OrderByDescending(t => (int)Enum.Parse<TodoPriority>($"{t.Priority}"))
                        .AsQueryable(),
                    TodoSortBy.DueDate => queryable.OrderByDescending(t => t.DueDate),
                    _ => queryable,
                };
            }
            return queryable;
        }
    }
}