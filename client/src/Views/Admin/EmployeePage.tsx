import { useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';

const EmployeePageAdmin = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
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
      {users.map((user: UserType) => (
        <Card user={user} key={user.id} />
      ))}
    </div>
  );
};
export default EmployeePageAdmin;
