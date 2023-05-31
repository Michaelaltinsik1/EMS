import { useContext, useEffect, useState } from 'react';
import { getAllLeaves } from 'src/API/leave';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Card from 'src/Components/Features/Cards';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { LeaveType, PermissionType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import { Toast } from 'src/utils/toastGenerator';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import LeaveForm from 'src/Components/Features/Forms/LeaveForm';
interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePageAdmin = () => {
  const [leaves, setLeaves] = useState<Array<LeaveType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
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
    <>
      <Contentmanagement toggleAddForm={toggleForm} buttonContent="Add leave" />
      <div className="p-4">
        <h1>Admin Leave</h1>
        {isMobile ? (
          leaves.map((leave) => (
            <Card permission={permission} leave={leave} key={leave.id} />
          ))
        ) : (
          <Table type={TaskTypes.LEAVE} permission={permission} data={leaves} />
        )}
      </div>
      {isFormOpen && (
        <LeaveForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default LeavePageAdmin;
