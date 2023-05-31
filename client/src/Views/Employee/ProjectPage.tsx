import { useContext, useEffect, useState } from 'react';
import { getProjectsWithEmployeeID } from 'src/API/project';

import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, ProjectType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import { Toast } from 'src/utils/toastGenerator';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import ProjectForm from 'src/Components/Features/Forms/ProjectForm';
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPage = () => {
  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
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
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add project"
        showAddButton={false}
      />
      <div className="p-4">
        <h1>Project</h1>
        {isMobile ? (
          projects.map((project) => (
            <Card permission={permission} project={project} key={project.id} />
          ))
        ) : (
          <Table
            type={TaskTypes.PROJECT}
            permission={permission}
            data={projects}
          />
        )}
      </div>
      {isFormOpen && (
        <ProjectForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default ProjectPage;
