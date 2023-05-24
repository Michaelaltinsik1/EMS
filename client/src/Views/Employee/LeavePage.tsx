import { useEffect, useState } from 'react';
import { getLeavesByUserId } from 'src/API/leave';
import { LeaveType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';

interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePage = () => {
  const [leaves, setLeaves] = useState<Array<LeaveType>>([]);
  useEffect(() => {
    const getLeaves = async () => {
      const leaves: LeaveAPI = await getLeavesByUserId(
        '2bc597e4-ec75-448f-ba6f-249550a33107'
      );
      console.log('Leaves: ', leaves);
      if (leaves?.data) {
        setLeaves(leaves.data);
        Toast({ message: 'Success', id: 'GetAllEmployeesToast' });
      } else {
        console.log(leaves.errors);
        if (leaves?.errors) {
          leaves?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllEmployeesToast',
              isSuccess: false,
            })
          );
        }
      }
    };
    getLeaves();
  }, []);
  return (
    <div>
      <h1>Leave</h1>
      {leaves.map((leave) => (
        <div key={leave.id}>
          <h2>Type: {leave.type_of_leave}</h2>
          <p>From: {leave.from.toString()}</p>
          <p>To: {leave.to.toString()}</p>
          <p>Status: {leave.status}</p>
        </div>
      ))}
    </div>
  );
};
export default LeavePage;
