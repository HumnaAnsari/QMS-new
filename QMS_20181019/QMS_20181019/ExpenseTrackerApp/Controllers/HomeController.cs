using ExpenseTrackerApp.Models;

using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using static ExpenseTrackerApp.Models.DAL;

namespace ExpenseTrackerApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ActionResult AdminView()
        {
            return View();
        }
        public ActionResult ApproveUsers()
        {
            return View();
        }
        public ActionResult AgentView()
        {
            return View();
        }
        public ActionResult Report()
        {
            return View();
        }
        public ActionResult CreateQuestions()
        {
            return View();
        }
        public ActionResult UploadQuestions()
        {
            return View();
        }
        public ActionResult CreateSubjects()
        {
            return View();
        }

        public ActionResult CreateQuiz()
        {
            return View();
        }
        public ActionResult Help()
        {
            return View();
        }
        public ActionResult Edit()
        {
            return View();
        }
        public ActionResult ViewQuiz()
        {
            return View();
        }
        public ActionResult Assign()
        {
            return View();
        }
        public JsonResult Graph(int uid, int qid, int AssignID)
        {
            try
            {

                List<GetGraph_Result> obj = new List<GetGraph_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    obj = db.GetGraph(uid, qid, AssignID).ToList();
                    return Json(obj, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                throw;
            }


        }

        public ActionResult AddUser(AddUserModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.addUser(model.UserName, model.FirstName, model.LastName, model.Password, model.Email, model.PhoneNumber, model.SecretQuestion, model.SecretAnswer, model.Role);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult AddSignUpUser(AddUserModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.addSignUpUser(model.UserName, model.FirstName, model.LastName, model.Password, model.Email, model.PhoneNumber, model.SecretQuestion, model.SecretAnswer, model.Role);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult EditUser(AddUserModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.editUser(model.UserId, model.UserName, model.FirstName, model.LastName, model.Password, model.Email, model.PhoneNumber, model.SecretQuestion, model.SecretAnswer, model.RoleName);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                throw;
            }
            //return null;
        }

        public ActionResult Delete()
        {
            return View();
        }

        public ActionResult FullResult(int uid, int qid, int aid)
        {
            ViewBag.AssignID = Convert.ToInt32(aid.ToString());
            ViewBag.UserID = Convert.ToInt32(uid.ToString());
            ViewBag.QuizID = Convert.ToInt32(qid.ToString());
            return View();
        }

        public ActionResult LeftPanel()
        {
            return PartialView("~/Views/Shared/_LeftPanel.cshtml");
        }
        public ActionResult Get_ExpenseDataType()
        {
            return null;
        }


        public ActionResult DeleteUser(int UserId)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.deleteUser(UserId);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }


        public ActionResult DeleteAssign(int AssignID)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.deleteAssignedQuiz(AssignID);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult EditAssign(string ExpireDate, int AssignID)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.editAssignedQuiz(ExpireDate,AssignID);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult DeleteQuiz(int QuizId)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.deleteQuiz(QuizId);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult AssignQuiz(AssignQuizModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.assignQuizToAgent(model.QuizId, model.TeacherId, model.ExpireDate, model.Agents);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }
        public ActionResult AgentGridData(int uid)
        {
            try
            {
                List<getAgentGridData_Result> data = new List<getAgentGridData_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getAgentGridData(uid).ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult ListUsersforApproval()
        {
            try
            {
                List<getUsersforApproval_Result> data = new List<getUsersforApproval_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getUsersforApproval().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult Approve(int UserId)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.approveUser(UserId);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult ListUsers()
        {
            try
            {
                List<getUserDetails_Result> data = new List<getUserDetails_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getUserDetails().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult ListControllers()
        {
            try
            {
                List<getControllers_Result> data = new List<getControllers_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getControllers().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult GetTestCategories()
        {
            try
            {
                List<getTestCategories_Result> data = new List<getTestCategories_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getTestCategories().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult ListSubjects()
        {
            try
            {
                List<getSubjectsList_Result> data = new List<getSubjectsList_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getSubjectsList().ToList();

                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult AddSubject(AddSubjectModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.addSubject(model.SubjectName, model.Category, model.ActiveF);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult EditQuestion(AddQuestionModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.editQuestion(model.QuestionType, model.Category, model.Question, model.OptionA, model.OptionB, model.OptionC, model.OptionD, model.Answer, model.SerialNumber);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult EditQuiz(AddQuizModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.editQuiz(model.QuizName, model.TotalQuestions, model.TimeAllocated, model.PassingScore, model.Subjects, model.CatID, model.QuizID);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }


        public ActionResult EditSubject(AddSubjectModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.editSubject(model.SubjectName, model.Category, model.ActiveF, model.SubjectId);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult ListQuestions()
        {
            try
            {
                List<getQuestionList_Result> data = new List<getQuestionList_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getQuestionList().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult AddQuestion(AddQuestionModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.addQuestion(model.QuestionType, model.Category, model.Question, model.OptionA, model.OptionB, model.OptionC, model.OptionD, model.Answer);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult DeleteQuestion(int QId)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.deleteQuestion(QId);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult GetSubjects(string catid)
        {
            try
            {
                int cid = Convert.ToInt32(catid);
                List<getSubjects_Result> data = new List<getSubjects_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getSubjects(cid).ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }
        public ActionResult GetQuestionsFromSubject(string questionvalue)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    int? j = db.GetQuestionsFromSubject(questionvalue).First();
                    return Json(j, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult GetAgents()
        {
            try
            {

                List<getAgents_Result> data = new List<getAgents_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getAgents().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }

        public ActionResult ListQuiz()
        {
            try
            {
                List<getQuizList_Result> data = new List<getQuizList_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getQuizList().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }
        public ActionResult ViewReport(int roleid, int userid)
        {
            try
            {
                List<viewReport_Result> list = new List<viewReport_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    list = db.viewReport(roleid, userid).ToList();
                }

                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }


        public ActionResult GetAssignedData(int roleid, int userid)
        {
            try
            {
                List<getAssignedData_Result> list = new List<getAssignedData_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    list = db.getAssignedData(roleid, userid).ToList();
                }

                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }


        public ActionResult DeleteSubject(int SId)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var data = db.deleteSubject(SId);
                    return Json(data, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {

            }
            return null;
        }



        public ActionResult AddQuiz(AddQuizModel model)
        {
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    var result = db.addQuiz(model.QuizName, model.TotalQuestions, model.TimeAllocated, model.PassingScore, model.Subjects, model.CatID);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public ActionResult GetSecretQuestion()
        {
            try
            {
                List<getSecretQuestions_Result> data = new List<getSecretQuestions_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {

                    data = db.getSecretQuestions().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //logger.Error(ex);
                return null;
            }
        }
        public ActionResult GetRoles()
        {
            try
            {
                List<getRoles_Result> data = new List<getRoles_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.getRoles().ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //logger.Error(ex);
                return null;
            }
        }

        [HttpPost]
        public ActionResult UploadQues(List<TableData> ds)
        {
            try { 
            List<getSubjectsList_Result> subjects = new List<getSubjectsList_Result>();
              
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    subjects = db.getSubjectsList().ToList();
                    string[] answers = new string[4];
                    string answer;
                    for (int i = 0; i < ds.Count; i++)
                    {
                        int flag = subjects.Where(x => x.SubjectName == ds[i].subjectname).Count();
                        if (flag == 0)
                        {
                            ds[i].Result = "Invalid Subject Name.";
                        }
                        else if (!(ds[i].OptionType.ToLower() == "single" || ds[i].OptionType.ToLower() == "multiple" || ds[i].OptionType.ToLower() == "true/false")) {
                            ds[i].Result = "Invalid Option Type";
                        }
                        else if (ds[i].OptionType.ToLower() == "single" || ds[i].OptionType.ToLower() == "multiple" || ds[i].OptionType.ToLower() == "true/false")
                        {
                            if (ds[i].OptionType.ToLower() == "single")
                            {
                                if (!(ds[i].Answer1.ToUpper() == "A" || ds[i].Answer1.ToUpper() == "B" || ds[i].Answer1.ToUpper() == "C" || ds[i].Answer1.ToUpper() == "D"))
                                {
                                    ds[i].Result = "Answer Should only be A, B, C or D";
                                }
                                else if (ds[i].option1 == "" || ds[i].option1 == null || ds[i].option2 == "" || ds[i].option2 == null)
                                {
                                    ds[i].Result = "Please enter atleast option 1 and option 2";
                                }
                                else
                                {
                                    //int result = 0;
                                    //Int32.TryParse(db.uploadQuestions_TEST(ds[i].subjectname, ds[i].question, ds[i].option1, ds[i].option2, ds[i].option3, ds[i].option4, ds[i].OptionType, ds[i].Answer1).ToString(), out result);
                                    var data = db.uploadQuestions_TEST(ds[i].subjectname, ds[i].question, ds[i].option1, ds[i].option2, ds[i].option3, ds[i].option4, ds[i].OptionType, ds[i].Answer1).FirstOrDefault();
                                    if (data =="False")
                                    {
                                        ds[i].Result = "Already exists";
                                    }
                                    else if (data == "True")
                                    {
                                        ds[i].Result = "Inserted!";
                                    }
                                    else
                                    {
                                        ds[i].Result = "Error!";
                                    }
                                }
                            }
                            else if (ds[i].OptionType.ToLower() == "true/false")
                            {
                                if (!(ds[i].Answer1.ToUpper() == "A" || ds[i].Answer1.ToUpper() == "B"))
                                {
                                    //ds[i].option1 = "True";
                                    //ds[i].option2 = "False";
                                    ds[i].Result = "Answer Should only be A or B";
                                }
                                else
                                {
                                    ds[i].option1 = "True";
                                    ds[i].option2 = "False";
                                    var data = db.uploadQuestions_TEST(ds[i].subjectname, ds[i].question, ds[i].option1, ds[i].option2, ds[i].option3, ds[i].option4, ds[i].OptionType, ds[i].Answer1).FirstOrDefault();
                                    if (data == "False")
                                    {
                                        ds[i].Result = "Already exists";
                                    }
                                    else if(data == "True")
                                    {
                                        ds[i].Result = "Inserted!";
                                    }
                                    else
                                    {
                                        ds[i].Result = "Error!";
                                    }
                                }
                            }
                            else if (ds[i].OptionType.ToLower() == "multiple")
                            {
                                if (ds[i].Answer1 == null || ds[i].Answer2 == null)
                                {

                                    ds[i].Result = "Answer 1 and 2 can't be empty";

                                }
                                else if (!((ds[i].Answer1 != null || ds[i].Answer1.ToUpper() == "A" || ds[i].Answer1.ToUpper() == "B" || ds[i].Answer1.ToUpper() == "C" || ds[i].Answer1.ToUpper() == "D")
                                    && (ds[i].Answer2 != null || ds[i].Answer2.ToUpper() == "A" || ds[i].Answer2.ToUpper() == "B" || ds[i].Answer2.ToUpper() == "C" || ds[i].Answer2.ToUpper() == "D")
                                    && (ds[i].Answer3 == null || ds[i].Answer3.ToUpper() == "A" || ds[i].Answer3.ToUpper() == "B" || ds[i].Answer3.ToUpper() == "C" || ds[i].Answer3.ToUpper() == "D" || ds[i].Answer3.ToUpper() == "")
                                    && (ds[i].Answer4 == null || ds[i].Answer4.ToUpper() == "A" || ds[i].Answer4.ToUpper() == "B" || ds[i].Answer4.ToUpper() == "C" || ds[i].Answer4.ToUpper() == "D" || ds[i].Answer4.ToUpper() == "")
                                    ))
                                {
                                    ds[i].Result = "Answer Should only be A, B, C or D";
                                }

                                else if ((ds[i].option1 == "" || ds[i].option1 == null) || (ds[i].option2 == "" || ds[i].option2 == null))
                                {
                                    ds[i].Result = "Please enter atleast option 1 and option 2";
                                }
                                else
                                {
                                    answers[0] = ds[i].Answer1.ToUpper();
                                    answers[1] = ds[i].Answer2.ToUpper();
                                    answers[2] = ds[i].Answer3 == null ? null : ds[i].Answer3.ToUpper();
                                    answers[3] = ds[i].Answer4 == null ? null : ds[i].Answer4.ToUpper();

                                    answer = String.Join(",", answers.Where(s => !string.IsNullOrEmpty(s)));
                                    ds[i].Answer1 = answer;
                                    var data = db.uploadQuestions_TEST(ds[i].subjectname, ds[i].question, ds[i].option1, ds[i].option2, ds[i].option3, ds[i].option4, ds[i].OptionType, ds[i].Answer1).FirstOrDefault();
                                    if (data == "False")
                                    {
                                        ds[i].Result = "Already exists";
                                    }
                                    else if(data == "True")
                                    {
                                        ds[i].Result = "Inserted!";
                                    }
                                    else
                                    {
                                        ds[i].Result = "Error.";
                                    }
                                }
                            }
                            else
                            {
                                ds[i].Result = "Unknown error in insertion!";
                            }
                        }
                        

                    }
                }
                return View("UploadQuestions", ds);
            }
            catch(Exception e) {
                return null;
            }
            
        }
        [HttpPost]
        public ActionResult UploadQuestions(HttpPostedFileBase file)
        {
            try { 
            DataSet ds = new DataSet();
            if (Request.Files["file"].ContentLength > 0)
            {
                string fileExtension =
                                     System.IO.Path.GetExtension(Request.Files["file"].FileName);

                if (fileExtension == ".xls" || fileExtension == ".xlsx")
                {
                    string fileLocation = Server.MapPath("~/Content/") + Request.Files["file"].FileName;
                    if (System.IO.File.Exists(fileLocation))
                    {

                        System.IO.File.Delete(fileLocation);
                    }
                    Request.Files["file"].SaveAs(fileLocation);
                    string excelConnectionString = string.Empty;
                    excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1;TypeGuessRows=0;ImportMixedTypes=Text\"";
                    //connection String for xls file format.
                    if (fileExtension == ".xls")
                    {
                        excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1;TypeGuessRows=0;ImportMixedTypes=Text\"";
                    }
                    //connection String for xlsx file format.
                    else if (fileExtension == ".xlsx")
                    {

                        excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1;TypeGuessRows=0;ImportMixedTypes=Text\"";
                    }
                    //Create Connection to Excel work book and add oledb namespace
                    OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                    excelConnection.Open();
                    DataTable dt = new DataTable();

                    dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    if (dt == null)
                    {
                        return null;
                    }

                    String[] excelSheets = new String[dt.Rows.Count];
                    int t = 0;
                    //excel data saves in temp file here.
                    foreach (DataRow row in dt.Rows)
                    {
                        excelSheets[t] = row["TABLE_NAME"].ToString();
                        t++;
                    }
                    OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);

                        string query = string.Format("Select * from[{0}]", excelSheets[0]);

                        //string query = string.Format("Select [SubjectName],[Question],[Option1],[Option2],[Option3],[Option4],[Answer1],[Answer2],[Answer3],[Answer4],[ChoiceType] from[{0}]", excelSheets[0]);
                    using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
                    {
                        dataAdapter.Fill(ds);
                    }
                }
                

            }
                List<TableData> list = new List<TableData>();
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    TableData tb = new TableData();
                    tb.subjectname = ds.Tables[0].Rows[i]["SubjectName"].ToString();
                    tb.question = ds.Tables[0].Rows[i]["Question"].ToString();
                    tb.option1 = ds.Tables[0].Rows[i]["Option1"].ToString();
                    tb.option2 = ds.Tables[0].Rows[i]["Option2"].ToString();
                    tb.option3 = ds.Tables[0].Rows[i]["Option3"].ToString();
                    tb.option4 = ds.Tables[0].Rows[i]["Option4"].ToString();
                    tb.Answer1 = ds.Tables[0].Rows[i]["Answer1"].ToString();
                    tb.Answer2 = ds.Tables[0].Rows[i]["Answer2"].ToString();
                    tb.Answer3 = ds.Tables[0].Rows[i]["Answer3"].ToString();
                    tb.Answer4 = ds.Tables[0].Rows[i]["Answer4"].ToString();
                    tb.OptionType = ds.Tables[0].Rows[i]["ChoiceType"].ToString();
                    list.Add(tb);
                    // do something with your list
                }

                //ViewBag.DataTable = ds;
                return View("UploadQuestions",list);
            }
            catch(Exception e)
            {
                return null;
            }
        }

        /*Sharoz New Work*/
        public ActionResult GetQuizData_Agent(int uid)
        {
            try
            {
                
                List<GetQuizData_Agent_Result> data = new List<GetQuizData_Agent_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.GetQuizData_Agent(uid).ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }
        public ActionResult UpdateTimoutStatus(int AssignID)
        {
            string result = "0";
            var profileData = Session["UserProfile"] as UserProfileSessionData;
            try
            {
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    //var  result =   db.UpdateTimoutStatus(profileData.User_ID, AssignID).FirstOrDefault();
                    int? j = db.UpdateTimoutStatus(profileData.User_ID, AssignID).First();
                    return Json(j, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ActionResult Result(int QuizID, int AssignID)
        {
            try
            {
                ViewBag.QuizID = QuizID;
                var profileData = Session["UserProfile"] as UserProfileSessionData;
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    List<GetResults_Result> data = db.GetResults(profileData.User_ID, QuizID, AssignID).ToList();
                    ViewBag.Status = data.FirstOrDefault().Status.ToString();
                    ViewBag.Marks = data.FirstOrDefault().Marks.ToString();
                    ViewBag.CompleteDate = data.FirstOrDefault().CompleteDate.ToString();
                    ViewBag.QuestionCount = data.FirstOrDefault().QuestionCount.ToString();
                    ViewBag.CorrectAnswer = data.FirstOrDefault().CorrectAnswers.ToString();
                    ViewBag.WrongAnswer = data.FirstOrDefault().WrongAnswers.ToString();
                    ViewBag.QuizName = data.FirstOrDefault().QuizName.ToString();
                    ViewBag.AssignID = AssignID;
                }

                return View();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        [HttpPost]
        public ActionResult SaveAnswers(List<result_obj> result_obj)
        {
            try
            {
                var profileData = Session["UserProfile"] as UserProfileSessionData;
                int result = 0;
                foreach (var item in result_obj)
                {
                    using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                    {
                        result = db.InsertAnswers(profileData.User_ID, item.quizid, item.questionnumber, item.answer, item.isCorrect, item.questionid, item.AssignID);
                    }
                }
                if (result == 1)
                {
                    using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                    {
                        result = db.UpdateMarks(result_obj.FirstOrDefault().quizid, profileData.User_ID);
                    }
                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public ActionResult GetCompleteResult(int uid, int qid, int AssignID)
        {
            try
            {
                List<GetResultsGrid_Data_Result> data = new List<GetResultsGrid_Data_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.GetResultsGrid_Data(uid, qid, AssignID).ToList();
                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //logger.Error(ex);
                return null;
            }
        }

        public ActionResult GetQuizQuestions(int UserId, int QuizID, int TimeAllocated, int AssignID)
        {
            var obj = this.DeserializeObject<QuizModel>("QuizModel");
            ViewBag.TimeAllocated = TimeAllocated.ToString();
            ViewBag.AssignID = Convert.ToInt32(AssignID.ToString());
            try
            {
                List<GetQuizQuestions_Result> data = new List<GetQuizQuestions_Result>();
                using (DBONLINETESTEntities db = new DBONLINETESTEntities())
                {
                    data = db.GetQuizQuestions(UserId, QuizID).ToList();
                }

                List<QuestionsModel> list = new List<QuestionsModel>();
                for (int i = 0; i < data.Count(); i++)
                {
                    QuestionsModel ques = new QuestionsModel();
                    ques.Answer = data[i].Answer.ToString();
                    ques.ChoiceType = data[i].ChoiceType.ToString();
                    ques.Option1 = data[i].Option1.ToString();
                    ques.Option2 = data[i].Option2.ToString();
                    ques.Option3 = data[i].Option3.ToString();
                    ques.Option4 = data[i].Option4.ToString();
                    ques.Question = data[i].Question.ToString();
                    ques.QuestionID = Convert.ToInt32(data[i].QuestionID.ToString());
                    ques.QuizID = Convert.ToInt32(data[i].QuizID.ToString());
                    ques.SubjectID = Convert.ToInt32(data[i].SubjectID.ToString());
                    ques.SubjectName = data[i].SubjectName.ToString();
                    list.Add(ques);
                }

                return View("Quiz", list);
            }
            catch (Exception ex)
            {
                // logger.Error(ex);
            }

            return null;

        }
        //public ActionResult Quiz(QuizModel Model)
        //{
        //    try
        //    {


        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }
        //    return null;
        //}
        /*Sharoz New Work*/


    }
}