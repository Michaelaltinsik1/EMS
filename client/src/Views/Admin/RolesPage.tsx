import { useEffect, useState } from 'react';
import { getAllRoles } from 'src/API/role';
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
    <div>
      <h1>Admin Role page</h1>
      {roles.map((role) => (
        <div key={role.id}>
          <h2>Name: {role.name}</h2>
          <p>Created_at: {role.created_at.toString()}</p>
          <p>id: {role.id}</p>
        </div>
      ))}
    </div>
  );
};
export default RolePageAdmin;
