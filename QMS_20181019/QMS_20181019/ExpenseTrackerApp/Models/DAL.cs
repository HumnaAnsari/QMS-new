using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTrackerApp.Models
{
    public class DAL
    {
        public class UserModel
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string Password { get; set; }
            public int RoleId { get; set; }

        }
        public class ReportModel
        {
            public int uid { get; set; }
            public int qid { get; set; }
            public int aid { get; set; }
        }
        public class result_obj
        {
            public int questionid { get; set; }
            public string questionnumber { get; set; }
            public string answer { get; set; }
            public int isCorrect { get; set; }
            public int quizid { get; set; }
            public int AssignID { get; set; }

        }
        public class TableData
        {
            public string subjectname { get; set; }
            public string question { get; set; }
            public string option1 { get; set; }
            public string option2 { get; set; }
            public string option3 { get; set; }
            public string option4 { get; set; }
            public string Answer1 { get; set; }
            public string Answer2 { get; set; }
            public string Answer3 { get; set; }
            public string Answer4 { get; set; }
            public string OptionType { get; set; }
            public string Result { get; set; }

        }

        public class AddUserModel
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int Role { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
            public string SecretQuestion { get; set; }
            public string SecretAnswer { get; set; }
            public string Password { get; set; }
            public int RoleId { get; set; }
            public string RoleName { get; set; }
        }

        public class AddQuizModel
        {
            public string QuizName { get; set; }
            public int TotalQuestions { get; set; }
            public int CatID { get; set; }
            public int TimeAllocated { get; set; }
            public int PassingScore { get; set; }
            public string Subjects { get; set; }
            public int QuizID { get; set; }

        }
        public class AddQuestionModel
        {
            public string QuestionType { get; set; }
            public string Category { get; set; }
            public string Question { get; set; }
            public string OptionA { get; set; }
            public string OptionB { get; set; }
            public string OptionC { get; set; }
            public string OptionD { get; set; }
            public string Answer { get; set; }
            public int SerialNumber { get; set; }

        }

        public class AddSubjectModel
        {
            public string SubjectName { get; set; }
            public int ActiveF { get; set; }
            public string Category { get; set; }
            public int SubjectId { get; set; }
        }

        public class AssignQuizModel
        {
            public int QuizId { get; set; }
            public string ExpireDate { get; set; }
            public int TeacherId { get; set; }
            public string Agents { get; set; }

        }

        public class UserProfileSessionData
        {
            public int User_ID { get; set; }
            public string User_Name { get; set; }
            public string User_LoginID { get; set; }
            public int User_Role { get; set; }
        }
        public class SearchViewModel
        {
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public string UserID { get; set; }
        }

        public class LoginViewModel
        {
            [Required, AllowHtml]
            public string Username { get; set; }

            [Required]
            [AllowHtml]
            [DataType(DataType.Password)]
            public string Password { get; set; }
        }
        public class QuizModel
        {
            public int UserId { get; set; }
            public int QuizID { get; set; }
            public int TimeAllocated { get; set; }
        }
        public class QuestionsModel
        {
            public int QuizID { get; set; }
            public int SubjectID { get; set; }
            public string SubjectName { get; set; }
            public string Question { get; set; }
            public int QuestionID { get; set; }
            public string Option1 { get; set; }
            public string Option2 { get; set; }
            public string Option3 { get; set; }
            public string Option4 { get; set; }
            public string Answer { get; set; }
            public string ChoiceType { get; set; }

        }
    }
}