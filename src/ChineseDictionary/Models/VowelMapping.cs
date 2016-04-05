using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class VowelMapping
    {
        public int Id { get; set; }
        [Required]
        public int AreaId { get; set; }
        [Required]
        public Area Area { get; set; }
        [Required]
        public int VowelId { get; set; }
        [Required]
        public Vowel Vowel { get; set; }
        [Required]
        public int IPAVowelId { get; set; }
        [Required]
        public IPAVowel IPAVowel { get; set; }
    }
}
