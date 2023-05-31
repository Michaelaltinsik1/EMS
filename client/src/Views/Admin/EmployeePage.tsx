import { useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import EmployeeForm from 'src/Components/Features/Forms/EmployeeForm';
const EmployeePageAdmin = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      console.log(users);
      if (users) {
        setUsers(users.value);
        Toast({ message: 'Success', id: 'GetAllEmployeesToast' });
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add employee"
      />
      <div className="p-4">
        <h1>Admin Department page</h1>
        {isMobile ? (
          users.map((user) => <Card user={user} key={user.id} />)
        ) : (
          <Table type={TaskTypes.USER} data={users} />
        )}
      </div>
      {isFormOpen && (
        <EmployeeForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default EmployeePageAdmin;
