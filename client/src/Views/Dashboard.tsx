import { useEffect, useState } from 'react';
import { getUsers } from '../API/index';
const DashBoardPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      if (users) {
        setUsers(users.value);
      }
    };
    getAllUsers();
  }, []);
  console.log(users);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Users:</p>
      {users.map((user) => (
        <div>
          <h2>test</h2>
        </div>
      ))}
    </div>
  );
};
export default DashBoardPage;
