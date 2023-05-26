import { useContext, useEffect, useState } from 'react';
import { getProjectsWithEmployeeID } from 'src/API/project';

import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import { PermissionType, ProjectType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPage = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAPI = await getProjectsWithEmployeeID(userId);
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
  }, [userId]);
  return (
    <div className="p-4">
      <h1>Project</h1>
      {projects.map((project) => (
        <Card permission={permission} project={project} key={project.id} />
      ))}
    </div>
  );
};
export default ProjectPage;
