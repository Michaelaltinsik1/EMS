import { useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import Heading from 'src/Components/Base/Heading';
import { UserType } from 'src/Types';

const DashBoardPage = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      if (users.status === 200) {
        setUsers(users.value);
      }
    };
    getAllUsers();
  }, []);
  console.log(users);
  return (
    <div className="p-4">
      <Heading className="mb-4 desktop:mb-6" type="H2" content="Dashboard" />
      <p>Users:</p>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.id}</h2>
          <p>{user.lastName}</p>
          <p>{user.roleId}</p>
          <p>{user.permission}</p>
        </div>
      ))}
    </div>
  );
};
export default DashBoardPage;
