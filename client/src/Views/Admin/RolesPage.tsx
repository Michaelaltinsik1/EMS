import { useCallback, useEffect, useRef, useState } from 'react';
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
import Paragraph from 'src/Components/Base/Paragrapgh';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import { calculateTotalPages } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
import { EntityTypes, FilterType } from 'src/Components/Features/Filter';
export interface RolesAPI {
  data?: Array<RoleType>;
  errors?: Array<{ error: string }>;
}
const RolePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMobile } = useBreakpoint();
  const { roles, updateRoles } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(roles?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const [temporaryStorage, setTemporaryStorage] = useState<RoleType[] | null>(
    roles
  );
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalroles = temporaryStorage?.slice(firstIndex, lastIndex);
  const [filters, setFilters] = useState<FilterType>({});
  useEffect(() => {
    const getRoles = async () => {
      setIsLoading(true);
      const rolesResponse: RolesAPI = await getAllRoles();
      if (rolesResponse?.data) {
        updateRoles(rolesResponse.data);
      }
      setIsLoading(false);
    };
    if (roles === null) {
      getRoles();
    }
  }, [roles, updateRoles]);

  const handleFilter = useCallback(() => {
    const values = roles?.filter((role) => {
      // Initialize a variable to track whether the employee meets all criteria
      let meetsAllCriteria = true;
      // Loop through the criteria object
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          if (
            key === 'filterByRole' &&
            role.name.toLowerCase() !== filters?.filterByRole?.toLowerCase()
          ) {
            meetsAllCriteria = false;
          }
        }
      }

      // If the employee meets all criteria, include them in the filtered result
      return meetsAllCriteria;
    });
    if (values) {
      setTemporaryStorage(values);
    }
  }, [filters, roles]);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add role"
        entity={EntityTypes.ROLE}
        setFilters={setFilters}
      />
      <div className="p-4 flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalroles ? (
          <>
            {isMobile ? (
              temporalroles.map((role) => <Card role={role} key={role.id} />)
            ) : (
              <Table type={TaskTypes.ROLE} data={temporalroles} />
            )}
            {pages.current > 0 && (
              <Pagination
                currPage={currPage}
                totalPages={pages.current}
                setCurrPage={setCurrPage}
              />
            )}
          </>
        ) : (
          <Paragraph type="body" content="No roles found" />
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
