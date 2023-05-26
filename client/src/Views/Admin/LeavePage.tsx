import { useContext, useEffect, useState } from 'react';
import { getAllLeaves } from 'src/API/leave';
import { AuthContext } from 'src/Components/Features/AuthProvider';
import Card from 'src/Components/Features/Cards';
import { LeaveType, PermissionType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePageAdmin = () => {
  const [leaves, setLeaves] = useState<Array<LeaveType>>([]);
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
  useEffect(() => {
    const getLeaves = async () => {
      const leaves: LeaveAPI = await getAllLeaves();
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
    <div className="p-4">
      <h1>Admin Leave</h1>
      {leaves.map((leave) => (
        <Card permission={permission} leave={leave} key={leave.id} />
      ))}
    </div>
  );
};
export default LeavePageAdmin;
