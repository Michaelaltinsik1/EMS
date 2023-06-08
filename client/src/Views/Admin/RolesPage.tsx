import { useEffect, useState } from 'react';
import { getAllRoles } from 'src/API/role';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { RoleType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';

import Contentmanagement from 'src/Components/Features/ContentManagement';
import RoleForm from 'src/Components/Features/Forms/RoleForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import { useContext } from 'react';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
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
            <Heading className="mb-4 desktop:mb-6" type="H2" content="Roles" />
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
      {isFormOpen && (
        <RoleForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default RolePageAdmin;
