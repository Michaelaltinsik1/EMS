import { useContext, useEffect, useRef, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';

import Card from 'src/Components/Features/Cards';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import EmployeeForm from 'src/Components/Features/Forms/EmployeeForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';

interface EmployeeAPI {
  data?: Array<UserType>;
  errors?: Array<{ error: string }>;
}
const EmployeePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { employees, updateEmployees } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(employees?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalEmployees = employees?.slice(firstIndex, lastIndex);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      const employeeResponse: EmployeeAPI = await getUsers();
      if (employeeResponse?.data) {
        updateEmployees(employeeResponse.data);
      }
      setIsLoading(false);
    };
    if (employees === null) {
      getAllUsers();
    }
  }, [employees, updateEmployees]);

  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add employee"
      />
      <div className="p-4 flex-1 flex flex-col">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Employees" />
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalEmployees ? (
          <>
            {isMobile ? (
              temporalEmployees.map((user) => (
                <Card user={user} key={user.id} />
              ))
            ) : (
              <Table type={TaskTypes.USER} data={temporalEmployees} />
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
          <Paragraph type="body" content="No employees found" />
        )}
      </div>
      {isFormOpen && (
        <EmployeeForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default EmployeePageAdmin;
