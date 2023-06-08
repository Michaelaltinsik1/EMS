import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { NoticeType, StatusType } from 'src/Types';
import TextArea from 'src/Components/Base/TextArea';
import { statuses } from 'src/utils/lists';
import { postNewNotice, updateNoticeById } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import { CacheContext } from '../Context/CacheProvider';
import { AuthContext } from '../Context/AuthProvider';
import { useContext, useState } from 'react';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';
import { ThemeContext } from '../Context/ThemeProvider';

interface NoticeProps {
  handleOnClick: () => void;
  notice?: NoticeType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
}
interface NoticeAPI {
  data?: Array<NoticeType>;
  errors?: Array<{ error: string }>;
}

interface FormFieldTypesEdit {
  status: string;
}
interface FormFieldTypesAdd {
  description: string;
}
const validationSchemaEdit = yup.object({
  status: yup.string().required('Status is a required field!'),
});
const validationSchemaAdd = yup.object({
  description: yup
    .string()
    .required('Description is a required field!')
    .min(5, 'Requires a minimum of 5 characters'),
});
const defaultValuesAdd = {
  description: '',
};

const NoticeForm = ({
  handleOnClick,
  notice,
  isEditForm = true,
  setIsFormOpen,
}: NoticeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const { isMobile } = useBreakpoint();
  const defaultValuesEdit = {
    status: notice?.status || '',
  };
  const { updateNotices } = useContext(CacheContext);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const onSubmitEdit = async ({ status }: FormFieldTypesEdit) => {
    setIsLoading(true);
    if (statuses.some((currStatus) => currStatus.id === status) && notice) {
      const noticeResponse: NoticeAPI = await updateNoticeById({
        status: status as StatusType,
        noticeId: notice.id || '',
      });
      if (noticeResponse?.data) {
        renderToast(noticeResponse, 'Notice has been uppdated!');
      } else {
        renderToast(noticeResponse);
      }
    } else {
      Toast({
        message: 'Invalid Status',
        id: 'NoticeToastError',
        isSuccess: false,
        theme: theme,
      });
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };
  const onSubmitAdd = async ({ description }: FormFieldTypesAdd) => {
    setIsLoading(true);
    const noticeResponse: NoticeAPI = await postNewNotice({
      description,
      userId: user?.userId || '',
    });
    if (noticeResponse?.data) {
      renderToast(noticeResponse, 'Notice has been added!');
    } else {
      renderToast(noticeResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };

  const renderToast = (rolesResponse: NoticeAPI, message?: string) => {
    if (rolesResponse?.data && message) {
      updateNotices(null);
      Toast({ message, id: 'NoticeToastSuccess', theme: theme });
    } else {
      if (rolesResponse?.errors) {
        rolesResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'NoticeToastError',
            isSuccess: false,
            theme: theme,
          })
        );
      } else {
        Toast({
          message: 'Internal server error!',
          id: 'NoticeToastError',
          isSuccess: false,
          theme: theme,
        });
      }
    }
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmitEdit}
        >
          <Heading className="mb-[24px]" type="H3" content="Edit notice" />
          <Select required options={statuses} name="status" label="Status:" />
          <div className=" tablet:flex tablet:flex-col desktop:flex-row desktop:justify-end">
            <Button
              className="desktop:ml-4 order-2"
              type="submit"
              variant="addButton"
            >
              {!isLoading ? 'Edit' : <Loader />}
            </Button>
            {!isMobile ? (
              <Button
                onClick={() => setIsRemoveModal(true)}
                className="desktop:mr-4 order-1 tablet:mb-[24px] desktop:mb-0"
                type="button"
                variant="removeButton"
              >
                remove
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Form>
      ) : (
        <Form
          defaultValues={defaultValuesAdd}
          validationSchema={validationSchemaAdd}
          onSubmit={onSubmitAdd}
        >
          <Heading className="mb-[24px]" type="H3" content="Add notice" />
          <TextArea name="description" label="Description:" />
          <Button
            className="desktop:self-end"
            type="submit"
            variant="addButton"
          >
            {!isLoading ? 'Add' : <Loader />}
          </Button>
        </Form>
      )}
      {isRemoveModal && (
        <RemoveModal
          Entity={Entities.NOTICE}
          handleOnClick={closeRemoveModal}
          id={notice?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default NoticeForm;
