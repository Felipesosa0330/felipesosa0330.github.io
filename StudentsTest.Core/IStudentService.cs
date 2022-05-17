using StudentsTest.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentsTest.Core
{
    public interface IStudentService
    {
        Task<List<Student>> GetStudentsAsync();
        Task<Student> GetStudentAsync(int studentId);
        Task<Student> SaveOrUpdateStudentAsync(Student student);
        Task DeleteStudentAsync(int studentId);
    }
}
