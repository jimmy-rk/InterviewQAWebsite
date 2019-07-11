using InterviewQAWebsite.Data;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewQAWebsite.Data
{
    public class DummyData
    {
        public static async Task Initialize(ApplicationDbContext context,
                              UserManager<IdentityUser> userManager,
                              RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

                    
            string role1 = "Admin";
           

           

            string password = "Jimmys17-";

            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role1));
            }
            

            if (await userManager.FindByNameAsync("Jimmy@rk.com") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "Jimmy@rk.com",
                    Email = "Jimmy@rk.com"
                    
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                
            }

            
        }
    }
}
