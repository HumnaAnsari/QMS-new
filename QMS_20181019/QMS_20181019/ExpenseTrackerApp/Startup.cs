using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ExpenseTrackerApp.Startup))]
namespace ExpenseTrackerApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
