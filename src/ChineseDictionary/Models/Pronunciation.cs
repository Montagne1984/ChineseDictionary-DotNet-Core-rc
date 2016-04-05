using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class Pronunciation
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ConsonantId { get; set; }
        [Required]
        public Consonant Consonant { get; set; }
        [Required]
        public int VowelId { get; set; }
        [Required]
        public Vowel Vowel { get; set; }
        [Required]
        public int ToneId { get; set; }
        [Required]
        public Tone Tone { get; set; }
        public List<CharacterPronunciation> CharacterPronunciations { get; set; }
    }
}
