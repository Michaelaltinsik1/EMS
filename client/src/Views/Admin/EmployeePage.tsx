import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getUsers } from 'src/API/user';
import { UserType } from 'src/Types';

import Card from 'src/Components/Features/Cards';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import EmployeeForm from 'src/Components/Features/Forms/EmployeeForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
import { FilterType } from 'src/Components/Features/Filter';
import { EntityTypes } from 'src/Components/Features/Filter';
interface EmployeeAPI {
  data?: Array<UserType>;
  errors?: Array<{ error: string }>;
}
const EmployeePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { employees, updateEmployees } = useContext(CacheContext);
  const [temporaryStorage, setTemporaryStorage] = useState<UserType[] | null>(
    employees
  );
  const [filters, setFilters] = useState<FilterType>({});
  const pages = useRef(0);
  pages.current = calculateTotalPages(employees?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalEmployees = temporaryStorage?.slice(firstIndex, lastIndex);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      const employeeResponse: EmployeeAPI = await getUsers();
      if (employeeResponse?.data) {
        updateEmployees(employeeResponse.data);
      }
      setIsLoading(false);
    };
    if (employees === null) {
      getAllUsers();
    }
  }, [employees, updateEmployees]);

  // const handleFilter = useCallback(() => {
  //   if (filters && employees && Object.keys(filters).includes('filterByName')) {
  //     setTemporaryStorage(
  //       employees?.filter((employee) => {
  //         if (employee && filters.filterByName) {
  //           const fullName = employee.firstName + ' ' + employee.lastName;
  //           return fullName
  //             .toLowerCase()
  //             .includes(filters.filterByName.toLowerCase());
  //         }
  //         return false;
  //       })
  //     );
  //   } else {
  //     setTemporaryStorage(employees);
  //   }
  // }, [filters, employees]);

  const handleFilter = useCallback(() => {
    const values = employees?.filter((employee) => {
      // Initialize a variable to track whether the employee meets all criteria
      let meetsAllCriteria = true;
      // Loop through the criteria object
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          // Check if the employee's property matches the dynamic criteria
          if (key as keyof FilterType) {
            if (
              key === 'filterByName' &&
              !(employee.firstName + ' ' + employee.lastName)
                .toLowerCase()
                .includes(filters?.filterByName?.toLowerCase() || '')
            ) {
              meetsAllCriteria = false;
            }

            if (
              key === 'filterByPermission' &&
              employee.permission.toLowerCase() !==
                filters?.filterByPermission?.toLowerCase()
            ) {
              meetsAllCriteria = false;
            }
            if (
              key === 'filterByRole' &&
              employee?.role?.name &&
              employee?.role?.name.toLowerCase() !==
                filters?.filterByRole?.toLowerCase()
            ) {
              meetsAllCriteria = false;
            }

            if (
              key === 'filterByDepartment' &&
              employee?.department?.name &&
              employee?.department?.name.toLowerCase() !==
                filters?.filterByDepartment?.toLowerCase()
            ) {
              meetsAllCriteria = false;
            }
          }
        }
      }

      // If the employee meets all criteria, include them in the filtered result
      return meetsAllCriteria;
    });
    if (values) {
      setTemporaryStorage(values);
    }
  }, [filters, employees]);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add employee"
        setFilters={setFilters}
        entity={EntityTypes.EMPLOYEE}
      />
      <div className="p-4 flex-1 flex flex-col">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Employees" />
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalEmployees ? (
          <>
            {isMobile ? (
              temporalEmployees.map((user) => (
                <Card user={user} key={user.id} />
              ))
            ) : (
              <Table type={TaskTypes.USER} data={temporalEmployees} />
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
          <Paragraph type="body" content="No employees found" />
        )}
      </div>
      {isFormOpen && (
        <EmployeeForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default EmployeePageAdmin;
