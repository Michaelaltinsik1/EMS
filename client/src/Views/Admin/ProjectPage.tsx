import { useEffect, useState } from 'react';
import { getAllProjects } from 'src/API/project';
import { ProjectType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPageAdmin = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAPI = await getAllProjects('dfsds');
      console.log('Leaves: ', projects);
      if (projects?.data) {
        setProjects(projects.data);
        Toast({ message: 'Success', id: 'GetAllProjectsToast' });
      } else {
        console.log(projects.errors);
        if (projects?.errors) {
          projects?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllEmployeesToast',
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
      <h1>Admin Project</h1>
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
export default ProjectPageAdmin;
