using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class WordCharacterPronunciation
    {
        public int Id { get; set; }
        [Required]
        public int WordPronunciationId { get; set; }
        [Required]
        public WordPronunciation WordPronunciation { get; set; }
        [Required]
        public int CharacterPronunciationId { get; set; }
        [Required]
        public CharacterPronunciation CharacterPronunciation { get; set; }
        [Required]
        public string ToneValue { get; set; }
    }
}
