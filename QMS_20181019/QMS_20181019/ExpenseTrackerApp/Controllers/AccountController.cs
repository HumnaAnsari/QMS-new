using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using ExpenseTrackerApp.Models;
using log4net;
using static ExpenseTrackerApp.Models.DAL;
using System.Web.Security;
using System.Collections.Generic;

namespace ExpenseTrackerApp.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ActionResult Index()
        {
            return RedirectToAction("LogOff", "Account");
        }
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult SignUp()
        {
            return View();
        }
        [HttpPost, AllowAnonymous]
        public ActionResult Login(LoginViewModel model)
        {
            try
            {
                if (!(ModelState.IsValid))
                {
                    if ((model.Username == "" || model.Username == null) && (model.Password == "" || model.Password == null))
                    {
                        ModelState.AddModelError("", "Please enter Username and Password");
                    }
                    return View(model);
                }
                else
                {
                    UserModel UserModel = new UserModel();
                    
                    UserProfileSessionData profileData = new UserProfileSessionData();
                    logger.Info("UserID:" + model.Username);
                    using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                    {
                        tblUser user = new tblUser();
                        user = (from usr in db.tblUsers where usr.UserName == model.Username.Trim() && usr.Password == model.Password.Trim() && usr.isActive==1 select usr).FirstOrDefault();
                        
                        if (user == null)
                        {
                            ModelState.AddModelError("", "Access Not Allowed");
                            logger.Debug("Error In Login Method User List Is Null. ");
                            return RedirectToAction("Access Denied", "Account");
                        }
                        else
                        {

                            profileData.User_ID = user.UserId;
                            profileData.User_Name = user.UserName.Trim();
                            profileData.User_Role = user.roleid;


                            
                        }
                    }

                    this.Session["UserProfile"] = profileData;
                    logger.Debug("Session Create");

                    FormsAuthentication.SetAuthCookie(model.Username, true);

                    logger.Debug("Redirect to View Based On Role");

                    if (profileData.User_Role == 1) {
                        return RedirectToAction("AdminView", "Home");
                    }
                    else if(profileData.User_Role == 2){
                        return RedirectToAction("CreateQuiz", "Home");
                    }
                    else if (profileData.User_Role == 3) {
                        return RedirectToAction("ViewQuiz", "Home");
                    }

                    
                }

            }
            catch (Exception ex)
            {
                //new VonageSalesController().log_action("", "Exception", ex.ToString());
                logger.Debug("Action # Account/Login , Message # " + "NT Login # " + model.Username + ex.Message, ex);
                return RedirectToAction("AccessDenied", "Account");
            }
            return View(model);

        }


        public ActionResult LogOff()
        {
            try
            {
                logger.Info("" + "In LogOff Action");
                Session["UserProfile"] = null;
                Session.Clear();
                Session.RemoveAll();
                Session.Abandon();
                FormsAuthentication.SignOut();
            }
            catch (Exception ex)
            {
                logger.Debug(ex);
                logger.Debug("", ex);
            }
            return RedirectToAction("Login", "Account");
        }
        [AllowAnonymous]
        public ActionResult AccessDenied()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Error()
        {
            return View();
        }
        [HttpPost]
        [OutputCache(Location = System.Web.UI.OutputCacheLocation.None, NoStore = true)]
        public ActionResult KeepSessionAlive()
        {
            try
            {
                if (Session["UserProfile"] != null)
                {
                    logger.Info(string.Concat(new string[] { "", DateTime.Now.ToString() }));
                    return new JsonResult { Data = "Success", };
                }
                else
                {
                    logger.Info(string.Concat(new string[] { "Session Null", DateTime.Now.ToString() }));
                    return RedirectToAction("LogOff", "Account");
                }
            }
            catch (Exception ex)
            {
                logger.Debug("", ex);
                return RedirectToAction("LogOff", "Account");
            }
        }

    }
}