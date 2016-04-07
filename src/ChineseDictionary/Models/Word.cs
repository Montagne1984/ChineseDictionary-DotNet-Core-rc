using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class Word
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<WordPronunciation> WordPronunciations { get; set; } 
        public List<WordDefinition> WordDefinitions { get; set; }
        public List<WordLabel> WordLabels { get; set; }
    }
}
