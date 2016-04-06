using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class WordPronunciationDefinition
    {
        public int Id { get; set; }
        [Required]
        public int WordPronunciationId { get; set; }
        [Required]
        public WordPronunciation WordPronunciation { get; set; }
        [Required]
        public int WordDefinitionId { get; set; }
        [Required]
        public WordDefinition WordDefinition { get; set; }
    }
}
