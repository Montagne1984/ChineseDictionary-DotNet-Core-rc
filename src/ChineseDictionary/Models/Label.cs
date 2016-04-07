using System.Collections.Generic;

namespace ChineseDictionary.Models
{
    public class Label
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<WordLabel> WordLabels { get; set; } 
    }
}
