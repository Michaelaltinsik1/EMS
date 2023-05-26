import { useContext, useEffect, useState } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getNoticeByUserId } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/AuthProvider';
interface NoticeAPI {
  data?: NoticeType;
  errors?: Array<{ error: string }>;
}
const NoticePage = () => {
  const [notice, setNotice] = useState<NoticeType>();
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
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
    <div className="p-4">
      <h1>Notice page</h1>
      {notice && (
        <Card permission={permission} notice={notice} key={notice?.id} />
      )}
    </div>
  );
};
export default NoticePage;
