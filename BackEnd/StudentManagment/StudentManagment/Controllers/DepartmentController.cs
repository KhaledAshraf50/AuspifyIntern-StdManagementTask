using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagment.Models;

namespace StudentManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DBContext _context;
        public DepartmentController(DBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetDepartments()
        {
            var allDepartments = _context.Departments.ToList();
            return Ok(allDepartments);
        }
        [HttpGet("{id:int}")]
        public IActionResult GetDepartment(int id)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Id == id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }
        [HttpPost]
        public IActionResult CreateDepartment([FromBody] Department department)
        {
            _context.Departments.Add(department);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, department);
        }
        [HttpPut("{id:int}")]
        public IActionResult UpdateDepartment(int id, [FromBody] Department department)
        {
            var existingDepartment = _context.Departments.FirstOrDefault(d => d.Id == id);
            if (existingDepartment == null)
            {
                return NotFound();
            }
            existingDepartment.Name = department.Name;
            _context.SaveChanges();
            return Ok(existingDepartment);
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteDepartment(int id)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Id == id);
            if (department == null)
            {
                return NotFound();
            }
            _context.Departments.Remove(department);
            _context.SaveChanges();
            return Ok(department);
        }
    }
}
