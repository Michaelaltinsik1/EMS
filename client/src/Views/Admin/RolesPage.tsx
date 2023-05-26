import { useEffect, useState } from 'react';
import { getAllRoles } from 'src/API/role';
import Card from 'src/Components/Features/Cards';
import { RoleType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface RolesAPI {
  data?: Array<RoleType>;
  errors?: Array<{ error: string }>;
}
const RolePageAdmin = () => {
  const [roles, setRoles] = useState<Array<RoleType>>([]);
  useEffect(() => {
    const getRoles = async () => {
      const roles: RolesAPI = await getAllRoles();
      console.log('roles: ', roles);
      if (roles?.data) {
        setRoles(roles.data);
        Toast({ message: 'Success', id: 'GetAllRolesToast' });
      } else {
        console.log(roles.errors);
        if (roles?.errors) {
          roles?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllRolesToast',
              isSuccess: false,
            })
          );
        }
      }
    };
    getRoles();
  }, []);
  return (
    <div className="p-4">
      <h1>Admin Role page</h1>
      {roles.map((role) => (
        <Card role={role} key={role.id} />
      ))}
    </div>
  );
};
export default RolePageAdmin;
