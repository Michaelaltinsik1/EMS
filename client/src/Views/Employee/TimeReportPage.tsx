import { useContext, useEffect, useState, useRef } from 'react';
import { getTimeReportsByUserId } from 'src/API/timereport';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, Time_reportType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';

import Contentmanagement from 'src/Components/Features/ContentManagement';
import TimereportForm from 'src/Components/Features/Forms/TimereportForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { timereports, updateTimereports } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(timereports?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalTimereports = timereports?.slice(firstIndex, lastIndex);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getTimeReports = async () => {
      setIsLoading(true);
      const timereportsReponse: TimereportAPI = await getTimeReportsByUserId(
        userId
      );
      if (timereportsReponse?.data) {
        updateTimereports(timereportsReponse.data);
      }
      setIsLoading(false);
    };
    if (timereports === null) {
      getTimeReports();
    }
  }, [timereports, updateTimereports, userId]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add timereport"
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

        {isFormOpen && (
          <TimereportForm
            setIsFormOpen={setIsFormOpen}
            isEditForm={false}
            handleOnClick={toggleForm}
          />
        )}
      </div>
    </>
  );
};
export default TimeReportPage;
