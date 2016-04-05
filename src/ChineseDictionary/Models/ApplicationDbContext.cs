using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

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

            builder.Entity<CharacterPronunciation>()
                .HasOne(cp => cp.Character)
                .WithMany(c => c.CharacterPronunciations);
            builder.Entity<CharacterPronunciation>()
                .HasOne(cp => cp.Pronunciation)
                .WithMany(p => p.CharacterPronunciations);
        }
    }
}
