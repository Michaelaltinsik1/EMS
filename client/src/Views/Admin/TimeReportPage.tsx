import { useContext, useEffect, useState } from 'react';
import { getAllTimeReports } from 'src/API/timereport';
import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, Time_reportType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import { Toast } from 'src/utils/toastGenerator';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import TimereportForm from 'src/Components/Features/Forms/TimereportForm';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPageAdmin = () => {
  const [timereports, setTimereports] = useState<Array<Time_reportType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getTimeReports = async () => {
      const timereports: TimereportAPI = await getAllTimeReports();
      console.log('Timereport: ', timereports);
      if (timereports?.data) {
        setTimereports(timereports.data);
        Toast({ message: 'Success', id: 'GetAllTimereportsToast' });
      } else {
        console.log(timereports.errors);
        if (timereports?.errors) {
          timereports?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllTimereportsToast',
              isSuccess: false,
            })
          );
        }
      }
    };
    getTimeReports();
  }, []);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add timereport"
      />
      <div className="p-4">
        <h1>Admin Time report page</h1>
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
      </div>
    </>
  );
};
export default TimeReportPageAdmin;
