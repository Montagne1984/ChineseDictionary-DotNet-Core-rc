using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Linq;

namespace ChineseDictionary.Models
{
    public static class IdentityData
    {
        public static async void Initialize(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetService(typeof(RoleManager<IdentityRole>)) as RoleManager<IdentityRole>;
            var superAdministratorRoleName = "Super Administrator";
            var role = await roleManager.FindByNameAsync(superAdministratorRoleName);
            if (role == null)
            {
                var createRoleResult = await roleManager.CreateAsync(new IdentityRole(superAdministratorRoleName));
                if (!createRoleResult.Succeeded)
                {
                    throw new Exception("Application initionalization failed.");
                }
            }

            var userManager = serviceProvider.GetService(typeof(UserManager<ApplicationUser>)) as UserManager<ApplicationUser>;
            var users = await userManager.GetUsersInRoleAsync(superAdministratorRoleName);
            if (users == null || !users.Any())
            {
                var superAdminUser = await userManager.FindByIdAsync("admin");
                if(superAdminUser == null)
                {
                    superAdminUser = new ApplicationUser { UserName = "admin@chinesedictionary.com", Email = "admin@chinesedictionary.com", EmailConfirmed = true };
                    var createUserResult = await userManager.CreateAsync(superAdminUser, "Abc123!");
                    if (!createUserResult.Succeeded)
                    {
                        throw new Exception("Application initionalization failed.");
                    }
                }

                var addToRoleResult = await userManager.AddToRoleAsync(superAdminUser, superAdministratorRoleName);
                if(!addToRoleResult.Succeeded)
                {
                    throw new Exception("Application initionalization failed.");
                }
            }
        }
    }
}
