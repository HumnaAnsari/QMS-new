using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Script.Serialization;

namespace ExpenseTrackerApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private readonly ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            log4net.Config.XmlConfigurator.Configure();
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                Exception exception = Server.GetLastError();
                Server.ClearError();
                log4net.ILog logger = log4net.LogManager.GetLogger(typeof(MvcApplication));
                logger.Error("Application_Error", exception);

                bool isAjaxCall = string.Equals("XMLHttpRequest", Context.Request.Headers["x-requested-with"], StringComparison.OrdinalIgnoreCase);

                if (isAjaxCall)
                {
                    Context.Response.StatusCode = 403; // note the change here
                    Context.Response.Write(new JavaScriptSerializer().Serialize(new { error = exception.Message }));
                }
                else
                {
                    Response.Redirect("~/Account/Logoff");
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
        }

        private void Application_BeginRequest(object sender, EventArgs e)
        {
            if (String.Compare(Request.Path, Request.ApplicationPath, StringComparison.InvariantCultureIgnoreCase) == 0 && !(Request.Path.EndsWith("/")))
                Response.Redirect(Request.Path + "/");
        }
    }
}
