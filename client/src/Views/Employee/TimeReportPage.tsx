import { useContext, useEffect, useState } from 'react';
import { getTimeReportsByUserId } from 'src/API/timereport';
import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { PermissionType, Time_reportType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPage = () => {
  const [timereports, setTimereports] = useState<Array<Time_reportType>>([]);
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getTimeReports = async () => {
      const timereports: TimereportAPI = await getTimeReportsByUserId(userId);
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
  }, [userId]);
  return (
    <div className="p-4">
      <h1>Time report page</h1>

      {isMobile ? (
        timereports.map((timereport) => (
          <Card
            permission={permission}
            timereport={timereport}
            key={timereport.id}
          />
        ))
      ) : (
        <Table permission={permission} timereports={timereports} />
      )}
    </div>
  );
};
export default TimeReportPage;
