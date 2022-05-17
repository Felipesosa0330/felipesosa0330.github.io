using Microsoft.EntityFrameworkCore;
using StudentsTest.DataAccess.DbContexts;
using StudentsTest.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentsTest.DataAccess.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StudentsTestDbContext _dbContext;

        public StudentRepository(StudentsTestDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task DeleteStudentAsync(int studentId)
        {
            var student = await GetStudentAsync(studentId);
            
            if(student != null)
            {
                student.Status = false;
                _dbContext.Entry(student).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<Student?> GetStudentAsync(int studentId) =>
               await _dbContext.Students.Where(s => s.Id == studentId && s.Status).FirstOrDefaultAsync();

        public async Task<List<Student>> GetStudentsAsync() =>
               await _dbContext.Students.Where(s => s.Status).ToListAsync();

        public async Task<Student> SaveStudentAsync(Student student)
        {
            await _dbContext.Students.AddAsync(student);
            await _dbContext.SaveChangesAsync();
            return student;
        }

        public async Task<Student> UpdateStudentAsync(Student student)
        {
            _dbContext.Entry(student).State = EntityState.Modified;
            _dbContext.Update(student);
            await _dbContext.SaveChangesAsync();
            return student;
        }
    }
}
