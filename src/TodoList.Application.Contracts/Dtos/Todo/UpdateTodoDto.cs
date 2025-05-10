using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace TodoList.Dtos.Todo
{
    public class UpdateTodoDto : IValidatableObject

    {
        [DataType(DataType.Text)]
        [MaxLength(100)]
        public string? Title { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(500)]
        public string? Description { get; set; }

        [EnumDataType(typeof(TodoStatus))]
        public TodoStatus? Status { get; set; }

        [EnumDataType(typeof(TodoPriority))]
        public TodoPriority? Priority { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? DueDate { get; set; }

        public void Normalize()
        {
            if (Title is not null)
            {
                Title = _normalizeString(Title);
            }
            if (Description is not null)
            {
                Description = _normalizeString(Description);
            }
        }

        private static string? _normalizeString(string? text)
            => text is null ? null : Regex.Replace(text, @"\s+", " ").Trim();

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(Title))
            {
                yield return new ValidationResult("Title is required.", [nameof(Title)]);
            }
            if (DueDate is not null && DueDate < DateTime.UtcNow) {
                yield return new ValidationResult("Due date must be in the future.", [nameof(DueDate)]);
            }
        }
    }
}
