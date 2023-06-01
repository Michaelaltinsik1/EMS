import { useContext, useEffect, useState } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getNoticeByUserId } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import NoticeForm from 'src/Components/Features/Forms/NoticeForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
interface NoticeAPI {
  data?: NoticeType;
  errors?: Array<{ error: string }>;
}
const NoticePage = () => {
  // const [notice, setNotice] = useState<NoticeType>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { notices, updateNotices } = useContext(CacheContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getNotices = async () => {
      const noticeReponse: NoticeAPI = await getNoticeByUserId(userId);
      // console.log('Notices: ', notice);
      if (noticeReponse?.data) {
        // setNotice(notice.data);
        const tempArray: Array<NoticeType> = [];
        tempArray.push(noticeReponse.data);
        updateNotices(tempArray);
        Toast({ message: 'Success', id: 'GetNoticesByIdToastSuccess' });
      } else {
        console.log(noticeReponse.errors);
        if (noticeReponse?.errors) {
          noticeReponse?.errors.map((errorMessage) =>
            Toast({
              message: errorMessage.error,
              id: 'GetNoticesByIdToastSuccessError',
              isSuccess: false,
            })
          );
        }
      }
    };
    if (notices === null) {
      getNotices();
    }
  }, [notices, updateNotices, userId]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add notice"
      />
      <div className="p-4">
        <h1>Notice page</h1>
        {notices ? (
          <>
            {notices.map((notice) => (
              <Card
                className="tabletEdgeCases:max-w-[50%] tabletEdgeCases:mx-auto"
                permission={permission}
                notice={notice}
                key={notice.id}
              />
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>

      {isFormOpen && (
        <NoticeForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default NoticePage;
