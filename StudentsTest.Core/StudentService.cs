using StudentsTest.DataAccess.Models;
using StudentsTest.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentsTest.Core
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }
        public async Task DeleteStudentAsync(int studentId)
        {
            await _studentRepository.DeleteStudentAsync(studentId);
        }

        public async Task<Student> GetStudentAsync(int studentId)
        {
            var student = await _studentRepository.GetStudentAsync(studentId);

            if (student != null)
                return student;

            throw new Exception("El estudiante no existe");
        }

        public async Task<List<Student>> GetStudentsAsync() =>
            await _studentRepository.GetStudentsAsync(); 

        public async Task<Student> SaveOrUpdateStudentAsync(Student student)
        {
            student.Status = true;
            if (student.Id == 0)
                await _studentRepository.SaveStudentAsync(student);
            else
                await _studentRepository.UpdateStudentAsync(student);

            return student;
        }
    }
}
