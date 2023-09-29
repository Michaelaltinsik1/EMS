import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getLeavesByUserId } from 'src/API/leave';
import Card from 'src/Components/Features/Cards';
import { LeaveType, PermissionType } from 'src/Types';

import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import LeaveForm from 'src/Components/Features/Forms/LeaveForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
import { EntityTypes, FilterType } from 'src/Components/Features/Filter';
interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { leaves, updateLeaves } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(leaves?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const [temporaryStorage, setTemporaryStorage] = useState<LeaveType[] | null>(
    leaves
  );
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalLeaves = temporaryStorage?.slice(firstIndex, lastIndex);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const [filters, setFilters] = useState<FilterType>({});
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getLeaves = async () => {
      setIsLoading(true);
      const leavesReponse: LeaveAPI = await getLeavesByUserId(userId);
      if (leavesReponse?.data) {
        updateLeaves(leavesReponse.data);
      }
      setIsLoading(false);
    };
    if (leaves === null) {
      getLeaves();
    }
  }, [leaves, updateLeaves, userId]);
  const handleFilter = useCallback(() => {
    const values = leaves?.filter((leave) => {
      // Initialize a variable to track whether the employee meets all criteria
      let meetsAllCriteria = true;
      // Loop through the criteria object
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          if (
            key === 'filterByLeave' &&
            filters?.filterByLeave &&
            leave?.type_of_leave !== filters?.filterByLeave
          ) {
            meetsAllCriteria = false;
          }
          if (
            key === 'filterByStatus' &&
            filters?.filterByStatus &&
            leave?.status !== filters?.filterByStatus
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
  }, [filters, leaves]);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add leave"
        entity={EntityTypes.LEAVE}
        setFilters={setFilters}
      />
      <div className="p-4 flex-1 flex flex-col">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Leaves" />
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalLeaves ? (
          <>
            {isMobile ? (
              temporalLeaves.map((leave) => (
                <Card permission={permission} leave={leave} key={leave.id} />
              ))
            ) : (
              <Table
                type={TaskTypes.LEAVE}
                permission={permission}
                data={temporalLeaves}
              />
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
          <Paragraph type="body" content="No leaves found" />
        )}
      </div>
      {isFormOpen && (
        <LeaveForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default LeavePage;
