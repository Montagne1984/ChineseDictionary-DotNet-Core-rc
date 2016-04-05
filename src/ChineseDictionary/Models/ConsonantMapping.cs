using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class ConsonantMapping
    {
        public int Id { get; set; }
        [Required]
        public int AreaId { get; set; }
        [Required]
        public Area Area { get; set; }
        [Required]
        public int ConsonantId { get; set; }
        [Required]
        public Consonant Consonant { get; set; }
        [Required]
        public int IPAConsonantId { get; set; }
        [Required]
        public IPAConsonant IPAConsonant { get; set; }
    }
}
