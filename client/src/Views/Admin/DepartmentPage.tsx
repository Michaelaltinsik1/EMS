import { useContext, useEffect, useRef, useState } from 'react';
import { getAllDepartments } from 'src/API/department';
import Loader from 'src/Components/Base/Loader';
import Card from 'src/Components/Features/Cards';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import DepartmentForm from 'src/Components/Features/Forms/DepartmentForm';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { DepartmentType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
interface DepartmentsAPI {
  data?: Array<DepartmentType>;
  errors?: Array<{ error: string }>;
}

const DepartmentPageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { departments, updateDepartments } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(departments?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const { isMobile } = useBreakpoint();
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalDepartments = departments?.slice(firstIndex, lastIndex);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getDepartments = async () => {
      setIsLoading(true);
      const departmentsResponse: DepartmentsAPI = await getAllDepartments();
      if (departmentsResponse?.data) {
        updateDepartments(departmentsResponse.data);
      }
      setIsLoading(false);
    };
    if (departments === null) {
      getDepartments();
    }
  }, [departments, updateDepartments]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add department"
      />
      <div className="p-4 flex-1 flex flex-col">
        <Heading
          className="mb-4 desktop:mb-6"
          type="H2"
          content="Departments"
        />
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalDepartments ? (
          <>
            {isMobile ? (
              temporalDepartments.map((department) => (
                <Card department={department} key={department.id} />
              ))
            ) : (
              <Table type={TaskTypes.DEPARTMENT} data={temporalDepartments} />
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
          <Paragraph type="body" content="No departments found" />
        )}
      </div>
      {isFormOpen && (
        <DepartmentForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default DepartmentPageAdmin;
