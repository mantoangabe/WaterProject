import { use, useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [PageSize, setPageSize] = useState<number>(10);
  const [PageNumber, setPageNumber] = useState<number>(1);
  const [TotalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const loadProjects = async () => {
      try { 
        setLoading(true);
        const data = await fetchProjects(PageSize, PageNumber, selectedCategories);
        setError(null);
      setProjects(data.projects);
      const calculatedPages = Math.ceil(data.totalCount / PageSize);
      setTotalPages(calculatedPages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [PageSize, PageNumber, selectedCategories]);
  if (loading) {
    return <p>Loading projects...</p>;
  }
  if (error) {
    return <p className='text-red-500'>Error loading projects: {error}</p>;
  }

  
  return (
    <>
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                {' '}
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                {' '}
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                {' '}
                <strong>Impact:</strong> {p.projectImpact}
              </li>
              <li>
                {' '}
                <strong>Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Functionality Status:</strong>{' '}
                {p.projectFunctionalityStatus}
              </li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}>
              Donate
            </button>
          </div>
          <Pagination
            currentPage={PageNumber}
            totalPages={TotalPages}
            pageSize={PageSize}
            onPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
          />
        </div>
      ))}
    </>
  );
}
export default ProjectList;
