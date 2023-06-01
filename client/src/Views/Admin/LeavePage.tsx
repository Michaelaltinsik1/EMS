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
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
interface LeaveAPI {
  data?: Array<LeaveType>;
  errors?: Array<{ error: string }>;
}
const LeavePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  const { user } = useContext(AuthContext);
  const { leaves, updateLeaves } = useContext(CacheContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const getLeaves = async () => {
      const leavesReponse: LeaveAPI = await getAllLeaves();
      if (leavesReponse?.data) {
        updateLeaves(leavesReponse.data);
        //Toast({ message: 'Success', id: 'GetAllLeavesToastSuccess' });
      }
      // else {
      //   console.log(leavesReponse.errors);
      //   if (leavesReponse?.errors) {
      //     leavesReponse?.errors.map((errorMessage) =>
      //       Toast({
      //         message: errorMessage.error,
      //         id: 'GetAllLeavesToastError',
      //         isSuccess: false,
      //       })
      //     );
      //   }
      // }
    };
    if (leaves === null) {
      getLeaves();
    }
  }, [leaves, updateLeaves]);
  return (
    <>
      <Contentmanagement toggleAddForm={toggleForm} buttonContent="Add leave" />
      <div className="p-4">
        <h1>Admin Leave</h1>
        {leaves ? (
          <>
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
export default LeavePageAdmin;
