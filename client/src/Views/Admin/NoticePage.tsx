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
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}
const NoticePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { notices, updateNotices } = useContext(CacheContext);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getNotices = async () => {
      const noticesReponse: NoticeAPI = await getAllNotices();
      console.log('Notices: ', notices);
      if (noticesReponse?.data) {
        updateNotices(noticesReponse.data);
        //Toast({ message: 'Success', id: 'GetAllNoticesToastSuccess' });
      }
      // else {
      //   console.log(noticesReponse.errors);
      //   if (noticesReponse?.errors) {
      //     noticesReponse?.errors.map((errorMessage) =>
      //       Toast({
      //         message: errorMessage.error,
      //         id: 'GetAllNoticesToastError',
      //         isSuccess: false,
      //       })
      //     );
      //   }
      // }
    };
    if (notices === null) {
      getNotices();
    }
  }, [notices, updateNotices]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add notice"
      />
      <div className="p-4">
        <h1>Admin Notice page</h1>
        {notices ? (
          <>
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>
      {isFormOpen && (
        <NoticeForm
          setIsFormOpen={setIsFormOpen}
          isEditForm={false}
          handleOnClick={toggleForm}
        />
      )}
    </>
  );
};
export default NoticePageAdmin;
