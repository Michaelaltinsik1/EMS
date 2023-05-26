import { useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
const EmployeePageAdmin = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
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
    <div className="p-4">
      <h1>Admin Department page</h1>
      {isMobile ? (
        users.map((user) => <Card user={user} key={user.id} />)
      ) : (
        <Table users={users} />
      )}
    </div>
  );
};
export default EmployeePageAdmin;
