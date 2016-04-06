using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class WordPronunciation
    {
        public int Id { get; set; }
        [Required]
        public int WordId { get; set; }
        [Required]
        public int AreaId { get; set; }
        [Required]
        public Area Area { get; set; }
        public List<WordCharacterPronunciation> WordCharacterPronunciations { get; set; }
        public List<WordPronunciationDefinition> WordPronunciationDefinitions { get; set; }
    }
}
