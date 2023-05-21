import { useEffect, useState } from 'react';
import { getTimeReportsByUserId } from 'src/API/timereport';
import { Time_reportType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
const TimeReportPage = () => {
  const [timereports, setTimereports] = useState<Array<Time_reportType>>([]);
  useEffect(() => {
    const getTimeReports = async () => {
      const timereports: TimereportAPI = await getTimeReportsByUserId(
        '2bc597e4-ec75-448f-ba6f-249550a33107'
      );
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
    <div>
      <h1>Time report page</h1>
      {timereports.map((timereport) => (
        <div key={timereport.id}>
          <h2>UserId: {timereport.userId}</h2>
          <p>From: {timereport.from.toString()}</p>
          <p>To: {timereport.to.toString()}</p>
          <p>Status: {timereport.status}</p>
        </div>
      ))}
    </div>
  );
};
export default TimeReportPage;
