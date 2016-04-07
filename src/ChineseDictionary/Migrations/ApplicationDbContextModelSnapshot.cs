using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ChineseDictionary.Models;

namespace ChineseDictionary.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ChineseDictionary.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasAnnotation("Relational:Name", "EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .HasAnnotation("Relational:Name", "UserNameIndex");

                    b.HasAnnotation("Relational:TableName", "AspNetUsers");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Area", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 20);

                    b.HasKey("Id");

                    b.HasAlternateKey("Name");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Character", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("SimplifiedSymbol");

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.HasKey("Id");

                    b.HasAlternateKey("Symbol");
                });

            modelBuilder.Entity("ChineseDictionary.Models.CharacterPronunciation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CharacterId");

                    b.Property<int>("PronunciationId");

                    b.HasKey("Id");

                    b.HasAlternateKey("CharacterId", "PronunciationId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Consonant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 5);

                    b.HasKey("Id");

                    b.HasAlternateKey("Symbol");
                });

            modelBuilder.Entity("ChineseDictionary.Models.ConsonantMapping", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AreaId");

                    b.Property<int>("ConsonantId");

                    b.Property<int>("IPAConsonantId");

                    b.HasKey("Id");

                    b.HasAlternateKey("AreaId", "ConsonantId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.IPAConsonant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 5);

                    b.HasKey("Id");

                    b.HasAlternateKey("Symbol");
                });

            modelBuilder.Entity("ChineseDictionary.Models.IPAVowel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 5);

                    b.HasKey("Id");

                    b.HasAlternateKey("Symbol");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Label", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasAlternateKey("Name");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Pronunciation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ConsonantId");

                    b.Property<int>("ToneId");

                    b.Property<int>("VowelId");

                    b.HasKey("Id");

                    b.HasAlternateKey("ConsonantId", "VowelId", "ToneId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Tone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AreaId");

                    b.Property<int>("ToneTypeId");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.HasKey("Id");

                    b.HasAlternateKey("AreaId", "Value");
                });

            modelBuilder.Entity("ChineseDictionary.Models.ToneType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AreaId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.HasKey("Id");

                    b.HasAlternateKey("Name");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Vowel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 5);

                    b.HasKey("Id");

                    b.HasAlternateKey("Symbol");
                });

            modelBuilder.Entity("ChineseDictionary.Models.VowelMapping", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AreaId");

                    b.Property<int>("IPAVowelId");

                    b.Property<int>("VowelId");

                    b.HasKey("Id");

                    b.HasAlternateKey("AreaId", "VowelId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Word", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAlternateKey("Name");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordCharacterPronunciation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CharacterPronunciationId");

                    b.Property<string>("ToneValue")
                        .IsRequired();

                    b.Property<int>("WordPronunciationId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordDefinition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<int>("WordId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordLabel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("LabelId");

                    b.Property<int>("WordId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordPronunciation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AreaId");

                    b.Property<int>("WordId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordPronunciationDefinition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("WordDefinitionId");

                    b.Property<int>("WordPronunciationId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasAnnotation("Relational:Name", "RoleNameIndex");

                    b.HasAnnotation("Relational:TableName", "AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAnnotation("Relational:TableName", "AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAnnotation("Relational:TableName", "AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasAnnotation("Relational:TableName", "AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasAnnotation("Relational:TableName", "AspNetUserRoles");
                });

            modelBuilder.Entity("ChineseDictionary.Models.CharacterPronunciation", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Character")
                        .WithMany()
                        .HasForeignKey("CharacterId");

                    b.HasOne("ChineseDictionary.Models.Pronunciation")
                        .WithMany()
                        .HasForeignKey("PronunciationId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.ConsonantMapping", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Area")
                        .WithMany()
                        .HasForeignKey("AreaId");

                    b.HasOne("ChineseDictionary.Models.Consonant")
                        .WithMany()
                        .HasForeignKey("ConsonantId");

                    b.HasOne("ChineseDictionary.Models.IPAConsonant")
                        .WithMany()
                        .HasForeignKey("IPAConsonantId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Pronunciation", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Consonant")
                        .WithMany()
                        .HasForeignKey("ConsonantId");

                    b.HasOne("ChineseDictionary.Models.Tone")
                        .WithMany()
                        .HasForeignKey("ToneId");

                    b.HasOne("ChineseDictionary.Models.Vowel")
                        .WithMany()
                        .HasForeignKey("VowelId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.Tone", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Area")
                        .WithMany()
                        .HasForeignKey("AreaId");

                    b.HasOne("ChineseDictionary.Models.ToneType")
                        .WithMany()
                        .HasForeignKey("ToneTypeId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.ToneType", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Area")
                        .WithMany()
                        .HasForeignKey("AreaId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.VowelMapping", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Area")
                        .WithMany()
                        .HasForeignKey("AreaId");

                    b.HasOne("ChineseDictionary.Models.IPAVowel")
                        .WithMany()
                        .HasForeignKey("IPAVowelId");

                    b.HasOne("ChineseDictionary.Models.Vowel")
                        .WithMany()
                        .HasForeignKey("VowelId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordCharacterPronunciation", b =>
                {
                    b.HasOne("ChineseDictionary.Models.CharacterPronunciation")
                        .WithMany()
                        .HasForeignKey("CharacterPronunciationId");

                    b.HasOne("ChineseDictionary.Models.WordPronunciation")
                        .WithMany()
                        .HasForeignKey("WordPronunciationId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordDefinition", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Word")
                        .WithMany()
                        .HasForeignKey("WordId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordLabel", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Label")
                        .WithMany()
                        .HasForeignKey("LabelId");

                    b.HasOne("ChineseDictionary.Models.Word")
                        .WithMany()
                        .HasForeignKey("WordId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordPronunciation", b =>
                {
                    b.HasOne("ChineseDictionary.Models.Area")
                        .WithMany()
                        .HasForeignKey("AreaId");

                    b.HasOne("ChineseDictionary.Models.Word")
                        .WithMany()
                        .HasForeignKey("WordId");
                });

            modelBuilder.Entity("ChineseDictionary.Models.WordPronunciationDefinition", b =>
                {
                    b.HasOne("ChineseDictionary.Models.WordDefinition")
                        .WithMany()
                        .HasForeignKey("WordDefinitionId");

                    b.HasOne("ChineseDictionary.Models.WordPronunciation")
                        .WithMany()
                        .HasForeignKey("WordPronunciationId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("ChineseDictionary.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("ChineseDictionary.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.HasOne("ChineseDictionary.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
        }
    }
}
