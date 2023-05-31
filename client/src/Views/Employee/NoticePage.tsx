import { useContext, useEffect, useState } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getNoticeByUserId } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import NoticeForm from 'src/Components/Features/Forms/NoticeForm';
interface NoticeAPI {
  data?: NoticeType;
  errors?: Array<{ error: string }>;
}
const NoticePage = () => {
  const [notice, setNotice] = useState<NoticeType>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getNotices = async () => {
      const notice: NoticeAPI = await getNoticeByUserId(userId);
      console.log('Notices: ', notice);
      if (notice?.data) {
        setNotice(notice.data);
        Toast({ message: 'Success', id: 'GetAllNoticesToast' });
      } else {
        console.log(notice.errors);
        if (notice?.errors) {
          notice?.errors.map((errorMessage) =>
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
  }, [userId]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add notice"
      />
      <div className="p-4">
        <h1>Notice page</h1>
        {notice && (
          <Card
            className="tabletEdgeCases:max-w-[50%] tabletEdgeCases:mx-auto"
            permission={permission}
            notice={notice}
            key={notice?.id}
          />
        )}
      </div>
      {isFormOpen && (
        <NoticeForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default NoticePage;
