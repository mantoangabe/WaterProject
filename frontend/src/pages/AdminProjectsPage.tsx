import { useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';
import { deleteProject } from '../api/ProjectsAPI';
import EditProjectForm from '../components/EditProjectForm';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [PageSize, setPageSize] = useState<number>(10);
  const [PageNumber, setPageNumber] = useState<number>(1);
  const [TotalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(PageSize, PageNumber, []);
        setError(null);
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalCount / PageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [PageSize, PageNumber]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Error loading projects: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h3 mb-0">Admin Projects</h1>
            <span className="badge text-bg-secondary">
              {projects.length} shown
            </span>
          </div>
          {!showForm && (
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowForm(true)}
            >
              Add New Project
            </button>
          )}
          {showForm && (
            <NewProjectForm
              onSuccess={() => {
                setShowForm(false);
                fetchProjects(PageSize, PageNumber, []).then((data) => {
                  setProjects(data.projects);
                  setTotalPages(Math.ceil(data.totalCount / PageSize));
                });
              }}
              onCancel={() => setShowForm(false)}
            />
          )}
          {editingProject && (
            <EditProjectForm
              project={editingProject}
              onSuccess={() => {
                setEditingProject(null);
                setShowForm(false);
                fetchProjects(PageSize, PageNumber, []).then((data) => {
                  setProjects(data.projects);
                  setTotalPages(Math.ceil(data.totalCount / PageSize));
                });
              }}
              onCancel={() => {
                setEditingProject(null);
                setShowForm(false);
              }}
            />
          )}
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Project ID</th>
                  <th>Project Name</th>
                  <th>Project Type</th>
                  <th>Regional Program</th>
                  <th>Impact</th>
                  <th>Phase</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.projectId}>
                    <td>{project.projectId}</td>
                    <td>{project.projectName}</td>
                    <td>{project.projectType}</td>
                    <td>{project.projectRegionalProgram}</td>
                    <td>{project.projectImpact}</td>
                    <td>{project.projectPhase}</td>
                    <td>{project.projectFunctionalityStatus}</td>
                    <td className="text-center">
                      <div
                        className="btn-group btn-group-sm"
                        role="group"
                        aria-label="Project actions"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setEditingProject(project);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={async () => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete project "${project.projectName}"?`,
                              )
                            ) {
                              try {
                                await deleteProject(project.projectId);
                                fetchProjects(PageSize, PageNumber, []).then(
                                  (data) => {
                                    setProjects(data.projects);
                                    setTotalPages(
                                      Math.ceil(data.totalCount / PageSize),
                                    );
                                  },
                                );
                              } catch (error) {
                                console.error('Error deleting project:', error);
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Pagination
          currentPage={PageNumber}
          totalPages={TotalPages}
          pageSize={PageSize}
          onPageChange={setPageNumber}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};
export default AdminProjectsPage;
