import { useContext, useEffect, useState } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getAllNotices } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/AuthProvider';
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}
const NoticePageAdmin = () => {
  const [notices, setNotices] = useState<Array<NoticeType>>([]);
  const { user } = useContext(AuthContext);
  const permission = user?.permission as PermissionType;
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
    <div>
      <h1>Admin Notice page</h1>
      {notices.map((notice) => (
        <Card permission={permission} notice={notice} key={notice.id} />
      ))}
    </div>
  );
};
export default NoticePageAdmin;
