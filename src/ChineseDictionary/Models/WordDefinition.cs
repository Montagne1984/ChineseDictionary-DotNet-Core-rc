using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class WordDefinition
    {
        public int Id { get; set; }
        [Required]
        public int WordId { get; set; }
        [Required]
        public string Description { get; set; }
        public List<WordExample> WordExamples { get; set; }
        public List<WordPronunciationDefinition> WordPronunciationDefinitions { get; set; }
    }
}
