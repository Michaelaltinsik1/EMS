import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { NoticeType, StatusType } from 'src/Types';
import Input from 'src/Components/Base/Input';
import { statuses } from 'src/utils/lists';
import { postNewNotice, updateNoticeById } from 'src/API/notice';
import { Toast } from 'src/utils/toastGenerator';
import { CacheContext } from '../Context/CacheProvider';
import { AuthContext } from '../Context/AuthProvider';
import { useContext } from 'react';

interface NoticeProps {
  handleOnClick: () => void;
  notice?: NoticeType;
  isEditForm?: boolean;
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
}: NoticeProps) => {
  const defaultValuesEdit = {
    status: notice?.status || '',
  };
  const { updateNotices } = useContext(CacheContext);
  const { user } = useContext(AuthContext);
  const onSubmitEdit = async ({ status }: FormFieldTypesEdit) => {
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
      });
    }
  };
  const onSubmitAdd = async ({ description }: FormFieldTypesAdd) => {
    const noticeResponse: NoticeAPI = await postNewNotice({
      description,
      userId: user?.userId || '',
    });
    if (noticeResponse?.data) {
      renderToast(noticeResponse, 'Notice has been added!');
    } else {
      renderToast(noticeResponse);
    }
  };

  const renderToast = (rolesResponse: NoticeAPI, message?: string) => {
    if (rolesResponse?.data && message) {
      updateNotices(null);
      Toast({ message, id: 'NoticeToastSuccess' });
    } else {
      if (rolesResponse?.errors) {
        rolesResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'NoticeToastError',
            isSuccess: false,
          })
        );
      } else {
        Toast({
          message: 'Internal server error!',
          id: 'NoticeToastError',
          isSuccess: false,
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
          <Button type="submit" variant="addButton">
            Edit
          </Button>
        </Form>
      ) : (
        <Form
          defaultValues={defaultValuesAdd}
          validationSchema={validationSchemaAdd}
          onSubmit={onSubmitAdd}
        >
          <Heading className="mb-[24px]" type="H3" content="Add notice" />
          {/* Add text area here later */}
          <Input required type="text" name="description" label="Description:" />
          <Button
            className="desktop:self-end"
            type="submit"
            variant="addButton"
          >
            Add
          </Button>
        </Form>
      )}
    </Modal>
  );
};
export default NoticeForm;
