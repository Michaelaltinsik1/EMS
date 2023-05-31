import { useContext, useEffect, useState } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getAllNotices } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import NoticeForm from 'src/Components/Features/Forms/NoticeForm';
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}
const NoticePageAdmin = () => {
  const [notices, setNotices] = useState<Array<NoticeType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getNotices = async () => {
      const notices: NoticeAPI = await getAllNotices();
      console.log('Notices: ', notices);
      if (notices?.data) {
        setNotices(notices.data);
        Toast({ message: 'Success', id: 'GetAllNoticesToast' });
      } else {
        console.log(notices.errors);
        if (notices?.errors) {
          notices?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllNoticesToast',
              isSuccess: false,
            })
          );
        }
      }
    };
    getNotices();
  }, []);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add notice"
      />
      <div className="p-4">
        <h1>Admin Notice page</h1>

        {isMobile ? (
          notices.map((notice) => (
            <Card permission={permission} notice={notice} key={notice.id} />
          ))
        ) : (
          <Table
            type={TaskTypes.NOTICE}
            permission={permission}
            data={notices}
          />
        )}
      </div>
      {isFormOpen && (
        <NoticeForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default NoticePageAdmin;
