import { useEffect, useState } from 'react';
import { NoticeType } from 'src/Types';
import { getAllNotices } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}
const NoticePageAdmin = () => {
  const [notices, setNotices] = useState<Array<NoticeType>>([]);
  useEffect(() => {
    const getNotices = async () => {
      const notices: NoticeAPI = await getAllNotices('dfsds');
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
        <div key={notice.id}>
          <h2>UserId: {notice.userId}</h2>
          <p>Created_at: {notice.created_at.toString()}</p>
          <p>Description: {notice.description}</p>
          <p>Status: {notice.status}</p>
        </div>
      ))}
    </div>
  );
};
export default NoticePageAdmin;
