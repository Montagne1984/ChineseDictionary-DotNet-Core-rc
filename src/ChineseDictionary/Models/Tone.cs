using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class Tone
    {
        public int Id { get; set; }
        [Required]
        public int AreaId { get; set; }
        [Required]
        public Area Area { get; set; }
        [Required]
        public int ToneTypeId { get; set; }
        [Required]
        public ToneType ToneType { get; set; }
        [Required, MaxLength(10)]
        public string Value { get; set; }
        public List<Pronunciation> Pronunciations { get; set; }
    }
}
