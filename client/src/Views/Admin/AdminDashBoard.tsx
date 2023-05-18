import { UserType } from '../../Types';
import { useEffect, useState } from 'react';
import { getUsers } from '../../API/user';
import SideBar from '../../Components/Features/SideBar';
//import { Toast } from '@src/utils/toastGenerator';
import { Toast } from '../../utils/toastGenerator';
const AdminDashBoardPage = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      console.log('Reponse:', users);
      if (users) {
        console.log('??');
        setUsers(users.value);
        Toast({ message: 'Success', id: '12345' });
      }
    };
    getAllUsers();
  }, []);
  console.log(users);
  return (
    <>
      <div>
        <h1>Admin Dashboard</h1>
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
    </>
  );
};
export default AdminDashBoardPage;
