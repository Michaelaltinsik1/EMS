import { useContext, useEffect, useState, useRef, useCallback } from 'react';
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
import { EntityTypes, FilterType } from 'src/Components/Features/Filter';
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}
const NoticePageAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { notices, updateNotices } = useContext(CacheContext);
  const [temporaryStorage, setTemporaryStorage] = useState<NoticeType[] | null>(
    notices
  );
  const pages = useRef(0);
  pages.current = calculateTotalPages(notices?.length || 0);
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = Number(ELEMENTSPERPAGE) * Number(currPage);
  const firstIndex = Number(lastIndex) - Number(ELEMENTSPERPAGE);
  const temporalNotices = temporaryStorage?.slice(firstIndex, lastIndex);
  const permission = user?.permission as PermissionType;
  const { isMobile } = useBreakpoint();
  const [filters, setFilters] = useState<FilterType>({});
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
  const handleFilter = useCallback(() => {
    const values = notices?.filter((notice) => {
      // Initialize a variable to track whether the employee meets all criteria
      let meetsAllCriteria = true;
      // Loop through the criteria object
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          if (
            key === 'filterByName' &&
            !(notice.user.firstName + ' ' + notice.user.lastName)
              .toLowerCase()
              .includes(filters?.filterByName?.toLowerCase() || '')
          ) {
            meetsAllCriteria = false;
          }
          if (
            key === 'filterByStatus' &&
            filters?.filterByStatus &&
            notice?.status !== filters?.filterByStatus
          ) {
            meetsAllCriteria = false;
          }
        }
      }

      // If the employee meets all criteria, include them in the filtered result
      return meetsAllCriteria;
    });
    if (values) {
      setTemporaryStorage(values);
    }
  }, [filters, notices]);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add notice"
        entity={EntityTypes.NOTICE}
        setFilters={setFilters}
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
