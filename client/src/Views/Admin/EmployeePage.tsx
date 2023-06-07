import { useContext, useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import EmployeeForm from 'src/Components/Features/Forms/EmployeeForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
interface EmployeeAPI {
  data?: Array<UserType>;
  errors?: Array<{ error: string }>;
}
const EmployeePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { employees, updateEmployees } = useContext(CacheContext);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getAllUsers = async () => {
      const employeeResponse: EmployeeAPI = await getUsers();
      if (employeeResponse?.data) {
        updateEmployees(employeeResponse.data);
        //Toast({ message: 'Success', id: 'GetAllEmployeesToastSuccess' });
      }
      // else {
      //   if (employeeResponse?.errors) {
      //     employeeResponse?.errors.map((errorMessage) =>
      //       Toast({
      //         message: errorMessage.error,
      //         id: 'GetAllEmployeesToastError',
      //         isSuccess: false,
      //       })
      //     );
      //   }
      // }
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
      <div className="p-4">
        <h1>Admin Department page</h1>
        {employees ? (
          <>
            {isMobile ? (
              employees.map((user) => <Card user={user} key={user.id} />)
            ) : (
              <Table type={TaskTypes.USER} data={employees} />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
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
