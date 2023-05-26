import { useContext, useEffect, useState } from 'react';
import { getLeavesByUserId } from 'src/API/leave';
import Card from 'src/Components/Features/Cards';
import { LeaveType, PermissionType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import { AuthContext } from 'src/Components/Features/AuthProvider';
interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePage = () => {
  const [leaves, setLeaves] = useState<Array<LeaveType>>([]);
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  useEffect(() => {
    const getLeaves = async () => {
      const leaves: LeaveAPI = await getLeavesByUserId(userId);
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
  }, [userId]);
  return (
    <div className="p-4">
      <h1>Leave</h1>
      {leaves.map((leave) => (
        <Card permission={permission} leave={leave} key={leave.id} />
      ))}
    </div>
  );
};
export default LeavePage;
