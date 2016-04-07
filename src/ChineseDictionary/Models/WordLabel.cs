using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChineseDictionary.Models
{
    public class WordLabel
    {
        public int Id { get; set; }
        [Required]
        public int WordId { get; set; }
        [Required]
        public Word Word { get; set; }
        [Required]
        public int LabelId { get; set; }
        [Required]
        public Label Label { get; set; }
    }
}
