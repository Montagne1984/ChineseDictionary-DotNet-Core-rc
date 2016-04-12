using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class WordExample
    {
        public int Id { get; set; }
        [Required]
        public int WordDefinitionId { get; set; }
        public WordDefinition WordDefinition { get; set; }
        [Required]
        public string Sentence { get; set; }
    }
}
