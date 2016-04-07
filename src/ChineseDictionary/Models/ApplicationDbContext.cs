using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace ChineseDictionary.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Consonant> Consonants { get; set; }
        public DbSet<Vowel> Vowels { get; set; }
        public DbSet<IPAConsonant> IPAConsonants { get; set; }
        public DbSet<IPAVowel> IPAVowels { get; set; }
        public DbSet<ConsonantMapping> ConsonantMappings { get; set; }
        public DbSet<VowelMapping> VowelMappings { get; set; }
        public DbSet<ToneType> ToneTypes { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Tone> Tones { get; set; }
        public DbSet<Pronunciation> Pronunciations { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<WordPronunciation> WordPronunciations { get; set; }
        public DbSet<Label> Labels { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<Consonant>().HasAlternateKey(c => c.Symbol);
            builder.Entity<Vowel>().HasAlternateKey(v => v.Symbol);
            builder.Entity<IPAConsonant>().HasAlternateKey(c => c.Symbol);
            builder.Entity<IPAVowel>().HasAlternateKey(v => v.Symbol);
            builder.Entity<ToneType>().HasAlternateKey(tt => tt.Name);
            builder.Entity<Area>().HasAlternateKey(a => a.Name);
            builder.Entity<Tone>().HasAlternateKey(t =>
                new
                {
                    t.AreaId,
                    t.Value
                });
            builder.Entity<ConsonantMapping>().HasAlternateKey(cm =>
                new
                {
                    cm.AreaId,
                    cm.ConsonantId
                });
            builder.Entity<VowelMapping>().HasAlternateKey(vm =>
                new
                {
                    vm.AreaId,
                    vm.VowelId
                });
            builder.Entity<Pronunciation>().HasAlternateKey(p =>
                new
                {
                    p.ConsonantId,
                    p.VowelId,
                    p.ToneId
                });
            builder.Entity<Character>().HasAlternateKey(c => c.Symbol);
            builder.Entity<CharacterPronunciation>().HasAlternateKey(cp =>
                new
                {
                    cp.CharacterId,
                    cp.PronunciationId
                });
            builder.Entity<Word>().HasAlternateKey(w => w.Name);
            builder.Entity<WordCharacterPronunciation>();
            builder.Entity<WordPronunciation>();
            builder.Entity<WordDefinition>();
            builder.Entity<Label>().HasAlternateKey(l => l.Name);
            builder.Entity<WordLabel>();

            builder.Entity<WordPronunciationDefinition>()
                .HasOne(wpd => wpd.WordPronunciation)
                .WithMany(wp => wp.WordPronunciationDefinitions)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordPronunciationDefinition>()
                .HasOne(wpd => wpd.WordDefinition)
                .WithMany(wd => wd.WordPronunciationDefinitions)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<WordLabel>()
                .HasOne(wl => wl.Word)
                .WithMany(w => w.WordLabels)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordLabel>()
                .HasOne(wl => wl.Label)
                .WithMany(l => l.WordLabels)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ConsonantMapping>()
                .HasOne(cm => cm.Area)
                .WithMany(a => a.ConsonantMappings)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<VowelMapping>()
                .HasOne(vm => vm.Area)
                .WithMany(a => a.VowelMappings)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Tone>()
                .HasOne(t => t.Area)
                .WithMany(a => a.Tones)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordPronunciation>()
                .HasOne(wp => wp.Area)
                .WithMany(a => a.WordPronunciations)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Pronunciation>()
                .HasOne(p => p.Consonant)
                .WithMany(c => c.Pronunciations)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Pronunciation>()
                .HasOne(p => p.Vowel)
                .WithMany(v => v.Pronunciations)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Pronunciation>()
                .HasOne(p => p.Tone)
                .WithMany(t => t.Pronunciations)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Tone>()
                .HasOne(t => t.ToneType)
                .WithMany(tt => tt.Tones)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
