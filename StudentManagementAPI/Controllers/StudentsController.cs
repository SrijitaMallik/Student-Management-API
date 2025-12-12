using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace YourNamespace.Controllers
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ClassName { get; set; }
        public string Gender { get; set; }
        public bool HasHobby { get; set; }
        public string Hobby { get; set; }
        public string FavouriteSubject { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
       
        private static readonly List<StudentDto> _students = new List<StudentDto>
        {
            new StudentDto { Id = 1, Name = "Ankit Kumar", ClassName = "Class 9", Gender = "Male", HasHobby = true, Hobby = "Cricket", FavouriteSubject = "Mathematics" },
            new StudentDto { Id = 2, Name = "Srijita Mallik", ClassName = "Class 8", Gender = "Female", HasHobby = true, Hobby = "Singing", FavouriteSubject = "Science" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<StudentDto>> Get()
        {
            return Ok(_students);
        }

        [HttpPost]
        public ActionResult<StudentDto> Post([FromBody] StudentDto s)
        {
            if (s == null || string.IsNullOrWhiteSpace(s.Name))
                return BadRequest();

            var nextId = _students.Any() ? _students.Max(x => x.Id) + 1 : 1;
            s.Id = nextId;
            _students.Add(s);
            return Ok(s);
        }
    }
}
