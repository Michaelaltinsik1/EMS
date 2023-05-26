import { useContext, useEffect, useState } from 'react';
import { getAllProjects } from 'src/API/project';
import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, ProjectType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPageAdmin = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAPI = await getAllProjects();
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
    <div className="p-4">
      <h1>Admin Project</h1>
      {isMobile ? (
        projects.map((project) => (
          <Card permission={permission} project={project} key={project.id} />
        ))
      ) : (
        <Table permission={permission} projects={projects} />
      )}
    </div>
  );
};
export default ProjectPageAdmin;
