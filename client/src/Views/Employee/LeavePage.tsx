import { useContext, useEffect, useState } from 'react';
import { getLeavesByUserId } from 'src/API/leave';
import Card from 'src/Components/Features/Cards';
import { LeaveType, PermissionType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import LeaveForm from 'src/Components/Features/Forms/LeaveForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { leaves, updateLeaves } = useContext(CacheContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getLeaves = async () => {
      const leavesReponse: LeaveAPI = await getLeavesByUserId(userId);
      console.log('Leaves: ', leaves);
      if (leavesReponse?.data) {
        updateLeaves(leavesReponse.data);
        Toast({ message: 'Success', id: 'GetLeavesByIdToastSuccess' });
      } else {
        console.log(leavesReponse.errors);
        if (leavesReponse?.errors) {
          leavesReponse?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetLeavesByIdToastSuccessError',
              isSuccess: false,
            })
          );
        }
      }
    };
    if (leaves === null) {
      getLeaves();
    }
  }, [leaves, updateLeaves, userId]);
  return (
    <>
      <Contentmanagement toggleAddForm={toggleForm} buttonContent="Add leave" />
      <div className="p-4">
        {leaves ? (
          <>
            <h1>Leave</h1>
            {isMobile ? (
              leaves.map((leave) => (
                <Card permission={permission} leave={leave} key={leave.id} />
              ))
            ) : (
              <Table
                type={TaskTypes.LEAVE}
                permission={permission}
                data={leaves}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>
      {isFormOpen && (
        <LeaveForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default LeavePage;
