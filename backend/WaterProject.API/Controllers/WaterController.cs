using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WaterController : ControllerBase
{
    public WaterDbContext _waterContext;

    public WaterController(WaterDbContext temp)
    {
        _waterContext = temp;
    }
    [HttpGet("AllProjects")]
    public IActionResult GetProjects(int pageSize = 10, int pageNumber = 1 )
    {
        var proj = _waterContext.Projects
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        var totalCount = _waterContext.Projects.Count();
        return Ok(new
        {
            Projects =  proj,
            TotalCount = totalCount
        });
    }

    [HttpGet("FunctionalProjects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        var projects = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return projects;
    }
}
    
    