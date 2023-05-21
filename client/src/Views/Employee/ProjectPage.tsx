import { useEffect, useState } from 'react';
import { getProjectsWithEmployeeID } from 'src/API/project';
import { ProjectType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPage = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAPI = await getProjectsWithEmployeeID(
        '80f9a863-4944-4f7b-ba29-05f5f3bd7362'
      );
      console.log('Leaves: ', projects);
      if (projects?.data) {
        setProjects(projects.data);
        Toast({ message: 'Success', id: 'GetProjectsToast' });
      } else {
        console.log(projects.errors);
        if (projects?.errors) {
          projects?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetProjectsToast',
              isSuccess: false,
            })
          );
        }
      }
    };
    getProjects();
  }, []);
  return (
    <div>
      <h1>Project</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>Name: {project.name}</h2>
          <p>Start: {project.created_at.toString()}</p>
          <p>Deadline: {project.deadline.toString()}</p>
          <p>Description: {project.description}</p>
        </div>
      ))}
    </div>
  );
};
export default ProjectPage;
