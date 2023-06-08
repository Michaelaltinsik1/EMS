import { useContext, useEffect, useState } from 'react';
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
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { timereports, updateTimereports } = useContext(CacheContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getTimeReports = async () => {
      const timereportsReponse: TimereportAPI = await getTimeReportsByUserId(
        userId
      );
      console.log('Timereport: ', timereports);
      if (timereportsReponse?.data) {
        updateTimereports(timereportsReponse.data);
      }
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
      <div className="p-4">
        <Heading
          className="mb-4 desktop:mb-6"
          type="H2"
          content="Timereports"
        />
        {timereports ? (
          <>
            {isMobile ? (
              timereports.map((timereport) => (
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
                data={timereports}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
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
