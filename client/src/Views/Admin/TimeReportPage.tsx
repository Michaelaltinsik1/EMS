import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getAllTimeReports } from 'src/API/timereport';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, Time_reportType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';

import Contentmanagement from 'src/Components/Features/ContentManagement';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
import { EntityTypes, FilterType } from 'src/Components/Features/Filter';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPageAdmin = () => {
  const [, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { timereports, updateTimereports } = useContext(CacheContext);
  const [temporaryStorage, setTemporaryStorage] = useState<
    Time_reportType[] | null
  >(timereports);
  const pages = useRef(0);
  pages.current = calculateTotalPages(timereports?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalTimereports = temporaryStorage?.slice(firstIndex, lastIndex);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const [filters, setFilters] = useState<FilterType>({});
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getTimeReports = async () => {
      setIsLoading(true);
      const timereportsResponse: TimereportAPI = await getAllTimeReports();
      if (timereportsResponse?.data) {
        updateTimereports(timereportsResponse.data);
      }
      setIsLoading(false);
    };
    if (timereports === null) {
      getTimeReports();
    }
  }, [timereports, updateTimereports]);

  const handleFilter = useCallback(() => {
    const values = timereports?.filter((timereport) => {
      // Initialize a variable to track whether the employee meets all criteria
      let meetsAllCriteria = true;
      // Loop through the criteria object
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          if (
            key === 'filterByName' &&
            !(timereport.user.firstName + ' ' + timereport.user.lastName)
              .toLowerCase()
              .includes(filters?.filterByName?.toLowerCase() || '')
          ) {
            meetsAllCriteria = false;
          }

          if (
            key === 'filterByStatus' &&
            filters?.filterByStatus &&
            timereport?.status !== filters?.filterByStatus
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
  }, [filters, timereports]);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add timereport"
        entity={EntityTypes.TIMEREPORT}
        setFilters={setFilters}
      />
      <div className="p-4 flex-1 flex flex-col">
        <Heading
          className="mb-4 desktop:mb-6"
          type="H2"
          content="Timereports"
        />
        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalTimereports ? (
          <>
            {isMobile ? (
              temporalTimereports.map((timereport) => (
                <Card
                  permission={permission}
                  timereport={timereport}
                  key={timereport.id}
                />
              ))
            ) : (
              <Table
                type={TaskTypes.TIMEREPORT}
                permission={permission}
                data={temporalTimereports}
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
          <Paragraph type="body" content="No timereports found" />
        )}
      </div>
    </>
  );
};
export default TimeReportPageAdmin;
