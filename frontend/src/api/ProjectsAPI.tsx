import type { Project } from '../types/Project';

interface FetchProjectsResponse {
  projects: Project[];
  totalCount: number;
}
export const fetchProjects = async (
  PageSize: number,
  PageNumber: number,
  selectedCategories: string[],
): Promise<FetchProjectsResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `https://localhost:5000/api/Water/AllProjects?pageSize=${PageSize}&pageNumber=${PageNumber}&${selectedCategories.length > 0 ? categoryParams : ''}`,
    );
    if (!response.ok) {
      throw new Error(`failed to fetch projects`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
export const addProject = async (
  project: Omit<Project, 'projectId'>,
): Promise<Project> => {
  try {
    const response = await fetch(
      'https://localhost:5000/api/Water/AddProject',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      },
    );
    if (!response.ok) {
      throw new Error(`failed to add project`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};
export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await fetch(
      `https://localhost:5000/api/Water/DeleteProject/${projectId}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error(`failed to delete project`);
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
export const updateProject = async (
  projectId: number,
  updatedProject: Omit<Project, 'projectId'>,
): Promise<Project> => {
  try {
    const response = await fetch(
      `https://localhost:5000/api/Water/UpdateProject/${projectId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      },
    );
    if (!response.ok) {
      throw new Error(`failed to update project`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};