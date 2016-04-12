using System.Collections.Generic;

namespace ChineseDictionary.Models
{
    public class Vowel : Phoneme
    {
        public List<Pronunciation> Pronunciations { get; set; }
        public List<VowelMapping> VowelMappings { get; set; }
    }
}
