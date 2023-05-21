import { useEffect, useState } from 'react';
import { NoticeType } from 'src/Types';
import { getNoticeByUserId } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
interface NoticeAPI {
  data?: NoticeType;
  errors?: Array<{ error: string }>;
}
const NoticePage = () => {
  const [notice, setNotice] = useState<NoticeType>();
  useEffect(() => {
    const getNotices = async () => {
      const notice: NoticeAPI = await getNoticeByUserId(
        '62d225f3-4b1f-4440-ad69-dac91e80e4f4'
      );
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
  }, []);
  return (
    <div>
      <h1>Notice page</h1>
      <div key={notice?.id}>
        <h2>UserId: {notice?.userId}</h2>
        <p>Created_at: {notice?.created_at.toString()}</p>
        <p>Description: {notice?.description}</p>
        <p>Status: {notice?.status}</p>
      </div>
    </div>
  );
};
export default NoticePage;
