using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.Models
{
    public class Area
    {
        public int Id { get; set; }
        [Required, MaxLength(20)]
        public string Name { get; set; }
        public List<ToneType> ToneTypes { get; set; }
        public List<Tone> Tones { get; set; }
    }
}
