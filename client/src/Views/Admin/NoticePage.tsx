import { useContext, useEffect, useState, useRef } from 'react';
import { NoticeType, PermissionType } from 'src/Types';
import { getAllNotices } from 'src/API/notice';

import Card from 'src/Components/Features/Cards';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import Table from 'src/Components/Features/Tables';
import { TaskTypes } from 'src/utils/enum';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import NoticeForm from 'src/Components/Features/Forms/NoticeForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
import Loader from 'src/Components/Base/Loader';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import { calculateTotalPages } from 'src/utils/functions';
import { ELEMENTSPERPAGE } from 'src/utils/functions';
import Pagination from 'src/Components/Features/Pagination';
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}
const NoticePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { notices, updateNotices } = useContext(CacheContext);
  const pages = useRef(0);
  pages.current = calculateTotalPages(notices?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalNotices = notices?.slice(firstIndex, lastIndex);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getNotices = async () => {
      setIsLoading(true);
      const noticesReponse: NoticeAPI = await getAllNotices();

      if (noticesReponse?.data) {
        updateNotices(noticesReponse.data);
      }
      setIsLoading(false);
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
      <div className="p-4 flex-1 flex flex-col">
        <Heading className="mb-4 desktop:mb-6" type="H2" content="Notices" />

        {isLoading ? (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        ) : temporalNotices ? (
          <>
            {isMobile ? (
              temporalNotices.map((notice) => (
                <Card permission={permission} notice={notice} key={notice.id} />
              ))
            ) : (
              <Table
                type={TaskTypes.NOTICE}
                permission={permission}
                data={temporalNotices}
              />
            )}
            {pages.current > 0 && (
              <Pagination
                currPage={currPage}
                totalPages={pages.current}
                setCurrPage={setCurrPage}
              />
            )}
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
export default NoticePageAdmin;
