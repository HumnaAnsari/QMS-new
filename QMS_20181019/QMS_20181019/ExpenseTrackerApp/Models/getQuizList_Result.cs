//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ExpenseTrackerApp.Models
{
    using System;
    
    public partial class getQuizList_Result
    {
        public int QuizId { get; set; }
        public string QuizName { get; set; }
        public int TotalQuestions { get; set; }
        public int TimeAllocated { get; set; }
        public int PassingScore { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public int TestCatID { get; set; }
        public string TestCatName { get; set; }
        public string Subjects { get; set; }
        public string SubjectIds { get; set; }
        public Nullable<int> QuestionCount { get; set; }
    }
}
