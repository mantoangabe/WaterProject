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
    public IActionResult GetProjects(int pageSize = 10, int pageNumber = 1, [FromQuery] List<string>? projectTypes = null)
    {
        IQueryable<Project> query = _waterContext.Projects.AsQueryable();
        if (projectTypes != null && projectTypes.Any())
        {
            query = query.Where(p => projectTypes.Contains(p.ProjectType));
        }

        var totalFilteredRecords = query.Count();
            
        var proj = query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        var totalCount = _waterContext.Projects.Count();
        return Ok(new
        {
            Projects =  proj,
            TotalCount = totalFilteredRecords
        });
    }

    [HttpGet("GetProjectTypes")]
    public IActionResult GetProjectTypes()
    {
        var projectTypes = _waterContext.Projects
            .Select(p => p.ProjectType)
            .Distinct()
            .ToList();
        return Ok(projectTypes);
    }

    [HttpPost("AddProject")]
    public IActionResult AddProject([FromBody] Project project)
    {
        _waterContext.Projects.Add(project);
        _waterContext.SaveChanges();
        return Ok(project);
    }

    [HttpPut("UpdateProject/{projectId}")]
    public IActionResult UpdateProject(int projectId, [FromBody] Project project)
    {
        var existingProject = _waterContext.Projects.Find(projectId);
        existingProject.ProjectName = project.ProjectName;
        existingProject.ProjectType = project.ProjectType;
        existingProject.ProjectRegionalProgram = project.ProjectRegionalProgram;
        existingProject.ProjectImpact = project.ProjectImpact;
        existingProject.ProjectPhase = project.ProjectPhase;
        existingProject.ProjectFunctionalityStatus = project.ProjectFunctionalityStatus;
        _waterContext.SaveChanges();
        return Ok(existingProject);
    }

    [HttpDelete("DeleteProject/{projectId}")]
    public IActionResult DeleteProject(int projectId)
    {
        var project =  _waterContext.Projects.Find(projectId);
        if (project == null)
        {
            return NotFound();
        }
        _waterContext.Projects.Remove(project);
        _waterContext.SaveChanges();
        return NoContent();
    }
    
    
}
    
    