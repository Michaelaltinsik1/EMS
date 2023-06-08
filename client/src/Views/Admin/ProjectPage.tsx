import { useContext, useEffect, useState } from 'react';
import { getAllProjects } from 'src/API/project';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, ProjectType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';

import Contentmanagement from 'src/Components/Features/ContentManagement';
import ProjectForm from 'src/Components/Features/Forms/ProjectForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { projects, updateProjects } = useContext(CacheContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getProjects = async () => {
      const projectsResponse: ProjectAPI = await getAllProjects();
      console.log('Leaves: ', projects);
      if (projectsResponse?.data) {
        updateProjects(projectsResponse.data);
      }
    };
    if (projects === null) {
      getProjects();
    }
  }, [projects, updateProjects]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add project"
      />
      <div className="p-4">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Projects" />
        {projects ? (
          <>
            {isMobile ? (
              projects.map((project) => (
                <Card
                  permission={permission}
                  project={project}
                  key={project.id}
                />
              ))
            ) : (
              <Table
                type={TaskTypes.PROJECT}
                permission={permission}
                data={projects}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>
      {isFormOpen && (
        <ProjectForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default ProjectPageAdmin;
