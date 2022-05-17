using Microsoft.EntityFrameworkCore;
using StudentsTest.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentsTest.DataAccess.DbContexts
{
    public class StudentsTestDbContext : DbContext
    {
        public virtual DbSet<Student> Students { get; set; }

        public StudentsTestDbContext(DbContextOptions<StudentsTestDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Student>(builder =>
            {
                builder.HasKey(x => x.Id);
                builder.Property(x => x.Course).HasColumnType("varchar(255)");
                builder.Property(x => x.Name).HasColumnType("varchar(255)");
            });
        }
    }
}
