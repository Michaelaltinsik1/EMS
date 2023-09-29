import { Theme } from 'src/Types/enums';
import Icon from '../Base/Icon';

import { useBreakpoint } from './hooks/useBreakpoint';
import Button from '../Base/Button';
import { useContext, useEffect, useState } from 'react';
import { PermissionType } from 'src/Types';
import { Type_of_leaveType } from 'src/Types';
import { StatusType } from 'src/Types';
import { permissions } from 'src/utils/lists';
import { statuses, leavesList } from 'src/utils/lists';
import { CacheContext } from './Context/CacheProvider';
import { getAllDepartments } from 'src/API/department';
import { DepartmentsAPI } from 'src/Views/Admin/DepartmentPage';
import { getAllRoles } from 'src/API/role';
import { RolesAPI } from 'src/Views/Admin/RolesPage';
import { AuthContext } from './Context/AuthProvider';
import Heading from '../Base/Heading';
import Overlay from './Overlay';
export enum EntityTypes {
  EMPLOYEE = 'employee',
  DEPARTMENT = 'department',
  LEAVE = 'leave',
  PROJECT = 'project',
  ROLE = 'role',
  TIMEREPORT = 'timereport',
  NOTICE = 'notice',
}

interface FilterProps {
  theme: Theme;
  setFilters?: (value: any) => void;
  entity?: EntityTypes;
}

enum FilterOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export interface FilterType {
  filterByName?: string;
  filterByRole?: string;
  filterByDepartment?: string;
  filterById?: FilterOrder | null;
  filterByPermission?: PermissionType | null;
  filterByLeave?: Type_of_leaveType | null;
  filterByDate?: Date | null;
  filterByBudget?: number | null;
  filterByStatus?: StatusType | null;
}

const Filter = ({ theme, setFilters, entity }: FilterProps) => {
  const { isDesktop } = useBreakpoint();
  const { departments, updateDepartments, roles, updateRoles } =
    useContext(CacheContext);

  const styles = `mb-4 h-[56px] px-4 py-3 text-body font-heading leading-150 rounded-lg border desktop:mr-4 desktop:mb-0 ${
    theme === Theme.LIGHT
      ? 'bg-gray-50 border-gray-900 text-gray-900 outline-blue-600 outline-1 '
      : 'bg-gray-600 border-gray-50 text-gray-100 outline-blue-400 outline-1 '
  }`;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!departments && user?.permission === 'ADMIN') {
      const getDepartments = async () => {
        const departmentsResponse: DepartmentsAPI = await getAllDepartments();
        if (departmentsResponse?.data) {
          updateDepartments(departmentsResponse.data);
        }
      };
      if (departments === null) {
        getDepartments();
      }
    }
    if (!roles && user?.permission === 'ADMIN') {
      const getRoles = async () => {
        const rolesResponse: RolesAPI = await getAllRoles();
        if (rolesResponse?.data) {
          updateRoles(rolesResponse.data);
        }
      };
      if (roles === null) {
        getRoles();
      }
    }
  }, [departments, updateDepartments, roles, updateRoles, user]);

  const [filterState, setFilterState] = useState<FilterType>({
    filterByName: '',
    filterByRole: '',
    filterByDepartment: '',
    filterByPermission: null,
    filterByLeave: null,
    filterByBudget: null,
    filterByStatus: null,
  });

  const displayFilters = () => {
    switch (entity) {
      case EntityTypes.EMPLOYEE: {
        return (
          <>
            {displayFilterByName()}
            {displayFilterByRole()}
            {displayFilterByDepartment()}
            {displayFilterByPermission()}
          </>
        );
      }
      case EntityTypes.DEPARTMENT: {
        return (
          <>
            {displayFilterByDepartment()}
            {displayFilterByBudget()}
          </>
        );
      }
      case EntityTypes.LEAVE: {
        return (
          <>
            {displayFilterByLeave()}
            {displayFilterByStatus()}
            {user?.permission === 'ADMIN' && displayFilterByName()}
          </>
        );
      }
      case EntityTypes.NOTICE: {
        return (
          <>
            {displayFilterByStatus()}
            {displayFilterByName()}
          </>
        );
      }
      case EntityTypes.PROJECT: {
        return <>{displayFilterByName()}</>;
      }
      case EntityTypes.ROLE: {
        return <>{displayFilterByRole()}</>;
      }
      case EntityTypes.TIMEREPORT: {
        return (
          <>
            {displayFilterByStatus()}
            {user?.permission === 'ADMIN' && displayFilterByName()}
          </>
        );
      }
      default:
        return <></>;
    }
  };
  const displayFilterByName = () => {
    return (
      <input
        value={filterState.filterByName}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({ ...filterState, filterByName: e.target.value });
        }}
        type="text"
        name="search"
        placeholder="Filter by name"
      />
    );
  };
  const displayFilterByBudget = () => {
    return (
      <input
        value={filterState.filterByBudget || ''}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({
            ...filterState,
            filterByBudget: Number(e.target.value),
          });
        }}
        type="number"
        name="budget"
        placeholder="Filter by budget"
      />
    );
  };
  const displayFilterByPermission = () => {
    return (
      <select
        value={filterState.filterByPermission || ''}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({
            ...filterState,
            filterByPermission: e.target.value as PermissionType,
          });
        }}
        name="permissions"
        id=""
      >
        <option value="" className="text-opacity-40">
          Permission
        </option>
        {permissions.map((permission) => (
          <option key={permission.id} value={permission.name}>
            {permission.name}
          </option>
        ))}
      </select>
    );
  };

  const displayFilterByLeave = () => {
    return (
      <select
        value={filterState.filterByLeave || ''}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({
            ...filterState,
            filterByLeave: e.target.value as Type_of_leaveType,
          });
        }}
        name="leave"
        id=""
      >
        <option value="" className="text-opacity-40">
          Leave
        </option>
        {leavesList.map((leave) => (
          <option key={leave.id} value={leave.id}>
            {leave.name}
          </option>
        ))}
      </select>
    );
  };
  const displayFilterByStatus = () => {
    return (
      <select
        value={filterState.filterByStatus || ''}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({
            ...filterState,
            filterByStatus: e.target.value as StatusType,
          });
        }}
        name="status"
        id=""
      >
        <option
          value={filterState.filterByStatus || ''}
          className="text-opacity-40"
        >
          Status
        </option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
    );
  };
  const displayFilterByRole = () => {
    return (
      <select
        value={filterState.filterByRole || ''}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({
            ...filterState,
            filterByRole: e.target.value,
          });
        }}
        name="role"
        id=""
      >
        <option value={''} className="text-opacity-40">
          Role
        </option>
        {roles &&
          roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name.slice(0, 20)}
            </option>
          ))}
      </select>
    );
  };
  const displayFilterByDepartment = () => {
    return (
      <select
        value={filterState.filterByDepartment || ''}
        className={`${styles} desktop:max-w-[200px] edgeCaseFilter:max-w-[150px]`}
        onChange={(e) => {
          setFilterState({
            ...filterState,
            filterByDepartment: e.target.value,
          });
        }}
        name="department"
        id=""
      >
        <option value="" className="text-opacity-40">
          Department
        </option>
        {departments &&
          departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name.slice(0, 20)}
            </option>
          ))}
      </select>
    );
  };
  const onReset = () => {
    setFilterState({
      filterByName: '',
      filterByRole: '',
      filterByDepartment: '',
      filterByPermission: null,
      filterByLeave: null,
      filterByBudget: null,
      filterByStatus: null,
    });
    if (setFilters) {
      setFilters({});
    }
  };
  const onFilter = () => {
    const truthyKeyValuePairs = [];
    for (const key in filterState) {
      if (filterState.hasOwnProperty(key)) {
        if (key as keyof FilterType) {
          const value = filterState[key as keyof FilterType];
          if (value) {
            truthyKeyValuePairs.push({ [key]: value });
          }
        }
      }
    }
    const mergedObject = truthyKeyValuePairs.reduce((result, currentObject) => {
      Object.assign(result, currentObject);
      return result;
    }, {});

    if (setFilters) {
      setFilters(mergedObject);
    }
  };

  return (
    <>
      {entity ? (
        <div>
          {isDesktop ? (
            <div className="flex items-center">
              {displayFilters()}
              <Button
                className="desktop:mx-4"
                onClick={onFilter}
                type="button"
                variant="addButton"
              >
                Filter
              </Button>
              <Button
                className="desktop:mr-4"
                onClick={onReset}
                type="button"
                variant="removeButton"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center"
              >
                <Icon name="Filter" theme={theme} />
              </button>
              {isModalOpen && (
                <Overlay handleOnClick={() => {}}>
                  <div
                    className={`p-4 z-[999] h-screen overflow-y-scroll mb-9 absolute top-[0] w-screen flex flex-col tablet:max-w-[400px] tablet:right-0 ${
                      theme === Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-800'
                    }`}
                  >
                    <div className="desktop:py-[40px] desktop:px-[56px] flex items-end justify-end">
                      <Icon
                        onClick={() => setIsModalOpen(false)}
                        className="ml-auto cursor-pointer"
                        name="Close"
                        theme={theme}
                      />
                    </div>
                    <Heading className="my-6" type="H2" content="Filter" />
                    {displayFilters()}
                    <div className="mt-auto">
                      <Button
                        className="mb-4"
                        onClick={() => {
                          setIsModalOpen(false);
                          onFilter();
                        }}
                        type="button"
                        variant="addButton"
                      >
                        Apply filters
                      </Button>
                      <Button
                        className=""
                        onClick={onReset}
                        type="button"
                        variant="removeButton"
                      >
                        Clear filters
                      </Button>
                    </div>
                  </div>
                </Overlay>
              )}
            </>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Filter;
