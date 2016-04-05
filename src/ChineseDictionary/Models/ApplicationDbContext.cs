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
        public DbSet<ToneType> ToneTypes { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Tone> Tones { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<Consonant>().HasAlternateKey(c => c.Symbol);
            builder.Entity<Vowel>().HasAlternateKey(v => v.Symbol);
            builder.Entity<ToneType>().HasAlternateKey(tt => tt.Name);
            builder.Entity<Area>().HasAlternateKey(a => a.Name);
            builder.Entity<Tone>().HasAlternateKey(t =>
                new
                {
                    t.AreaId,
                    t.Value
                });
        }
    }
}
