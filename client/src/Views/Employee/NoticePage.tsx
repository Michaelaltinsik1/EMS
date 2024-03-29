import { useContext, useEffect, useState } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getNoticeByUserId } from 'src/API/notice';
import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import NoticeForm from 'src/Components/Features/Forms/NoticeForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';

interface NoticeAPI {
  data?: NoticeType;
  errors?: Array<{ error: string }>;
}
const NoticePage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { notices, updateNotices } = useContext(CacheContext);
  const userId = user?.userId as string;
  const permission = user?.permission as PermissionType;
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getNotices = async () => {
      setIsLoading(true);
      const noticeReponse: NoticeAPI = await getNoticeByUserId(userId);
      if (noticeReponse?.data) {
        const tempArray: Array<NoticeType> = [];
        tempArray.push(noticeReponse.data);
        updateNotices(tempArray);
      }
      setIsLoading(false);
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
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Notices" />

        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : notices ? (
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
          <Paragraph type="body" content="No notices found" />
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
export default NoticePage;
