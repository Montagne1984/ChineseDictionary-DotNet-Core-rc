using System.ComponentModel.DataAnnotations;

namespace ChineseDictionary.ViewModels.Tones
{
    public class CreateToneViewModel
    {
        [Required]
        public int AreaId { get; set; }
        [Required]
        public int ToneTypeId { get; set; }
        [Required]
        [MaxLength(10)]
        public string Value { get; set; }
    }
}
