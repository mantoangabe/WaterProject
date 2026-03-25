import { use, useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [PageSize, setPageSize] = useState<number>(10);
  const [PageNumber, setPageNumber] = useState<number>(1);
  const [TotalItems, setTotalItems] = useState<number>(0);
  const [TotalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories.map((cat) => `categories=${encodeURIComponent(cat)}`).join('&');
      const response = await fetch(
        `https://localhost:5000/api/Water/AllProjects?pageSize=${PageSize}&pageNumber=${PageNumber}&${selectedCategories.length > 0 ? categoryParams : ''}`,
      );
      const data = await response.json();
      setProjects(data.projects);
      setTotalItems(data.totalCount);
      const calculatedPages = Math.ceil(data.totalCount / PageSize);
      setTotalPages(calculatedPages);

    };
    fetchProjects();
  }, [PageSize, PageNumber, selectedCategories]);

  
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
        </div>
      ))}
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
      <button
        disabled={PageNumber === 1}
        onClick={() => setPageNumber((prev) => prev - 1)}
      >
        Previous
      </button>

      {[...Array(TotalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNumber(i + 1)}
            disabled={PageNumber === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={PageNumber === TotalPages}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        Next
      </button>
      <br />
      <label>
        {' '}
        Results per page:
        <select
          value={PageSize}
          onChange={(e) => {setPageSize(Number(e.target.value)); setPageNumber(1);}}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      </div>
    </>
  );
}
export default ProjectList;
