import { useEffect, useState } from 'react';
import { getAllRoles } from 'src/API/role';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { RoleType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import { Toast } from 'src/utils/toastGenerator';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import RoleForm from 'src/Components/Features/Forms/RoleForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import { useContext } from 'react';
import Loader from 'src/Components/Base/Loader';
interface RolesAPI {
  data?: Array<RoleType>;
  errors?: Array<{ error: string }>;
}
const RolePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { isMobile } = useBreakpoint();
  const { roles, updateRoles } = useContext(CacheContext);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getRoles = async () => {
      const rolesResponse: RolesAPI = await getAllRoles();
      console.log('roles: ', roles);
      if (rolesResponse?.data) {
        updateRoles(rolesResponse.data);
        Toast({ message: 'Success', id: 'GetAllRolesToastSuccess' });
      } else {
        console.log(rolesResponse.errors);
        if (rolesResponse?.errors) {
          rolesResponse?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllRolesToastError',
              isSuccess: false,
            })
          );
        }
      }
    };
    if (roles === null) {
      getRoles();
    }
  }, [roles, updateRoles]);
  return (
    <>
      <Contentmanagement toggleAddForm={toggleForm} buttonContent="Add role" />
      <div className="p-4">
        {roles ? (
          <>
            <h1>Admin Role page</h1>
            {isMobile ? (
              roles.map((role) => <Card role={role} key={role.id} />)
            ) : (
              <Table type={TaskTypes.ROLE} data={roles} />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>
      {isFormOpen && <RoleForm isEditForm={false} handleOnClick={toggleForm} />}
    </>
  );
};
export default RolePageAdmin;
