import { useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';

const EmployeePageAdmin = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      if (users) {
        setUsers(users.value);
        Toast({ message: 'Success', id: 'GetAllEmployeesToast' });
      }
    };
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Admin Employee page</h1>
      <p>Users:</p>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.id}</h2>
          <p>{user.firstName}</p>
          <p>{user.roleId}</p>
          <p>{user.permission}</p>
        </div>
      ))}
    </div>
  );
};
export default EmployeePageAdmin;
