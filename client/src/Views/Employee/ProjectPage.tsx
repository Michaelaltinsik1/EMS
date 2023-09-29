import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getProjectsWithEmployeeID } from 'src/API/project';

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
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
import { EntityTypes, FilterType } from 'src/Components/Features/Filter';

interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
const ProjectPage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { projects, updateProjects } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(projects?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const [temporaryStorage, setTemporaryStorage] = useState<
    ProjectType[] | null
  >(projects);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalProjects = temporaryStorage?.slice(firstIndex, lastIndex);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const [filters, setFilters] = useState<FilterType>({});
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getProjects = async () => {
      setIsLoading(true);
      const projectsResponse: ProjectAPI = await getProjectsWithEmployeeID(
        userId
      );
      if (projectsResponse?.data) {
        updateProjects(projectsResponse.data);
      }
      setIsLoading(false);
    };
    if (projects === null) {
      getProjects();
    }
  }, [projects, updateProjects, userId]);
  const handleFilter = useCallback(() => {
    const values = projects?.filter((project) => {
      // Initialize a variable to track whether the employee meets all criteria
      let meetsAllCriteria = true;
      // Loop through the criteria object
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          if (
            key === 'filterByName' &&
            !project.name
              .toLowerCase()
              .includes(filters?.filterByName?.toLowerCase() || '')
          ) {
            meetsAllCriteria = false;
          }
        }
      }
      // If the employee meets all criteria, include them in the filtered result
      return meetsAllCriteria;
    });
    if (values) {
      setTemporaryStorage(values);
    }
  }, [filters, projects]);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add project"
        showAddButton={false}
        entity={EntityTypes.PROJECT}
        setFilters={setFilters}
      />
      <div className="p-4 flex-1 flex flex-col">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Projects" />

        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalProjects ? (
          <>
            {isMobile ? (
              temporalProjects.map((project) => (
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
                data={temporalProjects}
              />
            )}
            {pages.current > 0 && (
              <Pagination
                currPage={currPage}
                totalPages={pages.current}
                setCurrPage={setCurrPage}
              />
            )}
          </>
        ) : (
          <Paragraph type="body" content="No projects found" />
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
export default ProjectPage;
