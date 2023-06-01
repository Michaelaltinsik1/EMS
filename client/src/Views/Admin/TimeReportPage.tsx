import { useContext, useEffect, useState } from 'react';
import { getAllTimeReports } from 'src/API/timereport';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, Time_reportType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import { Toast } from 'src/utils/toastGenerator';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import TimereportForm from 'src/Components/Features/Forms/TimereportForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPageAdmin = () => {
  //const [timereports, setTimereports] = useState<Array<Time_reportType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { timereports, updateTimereports } = useContext(CacheContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getTimeReports = async () => {
      const timereportsResponse: TimereportAPI = await getAllTimeReports();
      console.log('Timereport: ', timereports);
      if (timereportsResponse?.data) {
        updateTimereports(timereportsResponse.data);
        // Toast({ message: 'Success', id: 'GetAllTimereportsToastSuccess' });
      }
      // else {
      //   console.log(timereportsResponse.errors);
      //   if (timereportsResponse?.errors) {
      //     timereportsResponse?.errors.map((errorMessage) =>
      //       Toast({
      //         message: errorMessage.error,
      //         id: 'GetAllTimereportsToastError',
      //         isSuccess: false,
      //       })
      //     );
      //   }
      // }
    };
    if (timereports === null) {
      getTimeReports();
    }
  }, [timereports, updateTimereports]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add timereport"
      />
      <div className="p-4">
        <h1>Admin Time report page</h1>
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
            {isFormOpen && (
              <TimereportForm isEditForm={false} handleOnClick={toggleForm} />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>
    </>
  );
};
export default TimeReportPageAdmin;
