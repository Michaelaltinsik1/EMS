import { useContext, useEffect, useState } from 'react';
import { getAllTimeReports } from 'src/API/timereport';
import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import { PermissionType, Time_reportType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPageAdmin = () => {
  const [timereports, setTimereports] = useState<Array<Time_reportType>>([]);
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
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
    <div className="p-4">
      <h1>Admin Time report page</h1>
      {timereports.map((timereport) => (
        <Card
          permission={permission}
          timereport={timereport}
          key={timereport.id}
        />
      ))}
    </div>
  );
};
export default TimeReportPageAdmin;
