import { useEffect, useState } from 'react';
import { getUsers } from 'src/API/user';
import Heading from 'src/Components/Base/Heading';
import { UserType } from 'src/Types';

const DashBoardPage = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      // const users = await getUsers();
      // if (users.status === 200) {
      //   setUsers(users.value);
      // }
    };
    getAllUsers();
  }, []);

  return (
    <div className="p-4">
      <Heading className="mb-4 desktop:mb-6" type="H2" content="Dashboard" />
    </div>
  );
};
export default DashBoardPage;
