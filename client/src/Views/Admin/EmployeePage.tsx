import { useContext, useEffect, useState } from 'react';
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
interface EmployeeAPI {
  data?: Array<UserType>;
  errors?: Array<{ error: string }>;
}
const EmployeePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { employees, updateEmployees } = useContext(CacheContext);
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
      {/* <div className="p-4 desktop:px-[56px] desktop:py-[32px] xlDesktop:px-[80px] xlDesktop:py-[56px]"> */}
      <div className="p-4">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Employees" />
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : employees ? (
          <>
            {isMobile ? (
              employees.map((user) => <Card user={user} key={user.id} />)
            ) : (
              <Table type={TaskTypes.USER} data={employees} />
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
