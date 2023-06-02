import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { LeaveType, StatusType } from 'src/Types';
import Input from 'src/Components/Base/Input';
import { statuses } from 'src/utils/lists';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { CacheContext } from '../Context/CacheProvider';
import { Toast } from 'src/utils/toastGenerator';
import { postNewLeave, updateLeaveById } from 'src/API/leave';
import { leavesList } from 'src/utils/lists';
import { Type_of_leaveType } from 'src/Types';
interface LeaveProps {
  handleOnClick: () => void;
  leave?: LeaveType;
  isEditForm?: boolean;
}
interface LeaveAPI {
  data?: LeaveType;
  errors?: Array<{ error: string }>;
}
interface FormFieldTypesEdit {
  status: string;
}
interface FormFieldTypesAdd {
  from: string;
  to: string;
  type: string;
}
const validationSchemaEdit = yup.object({
  status: yup.string().required('Status is a required field'),
});
const validationSchemaAdd = yup.object({
  to: yup.string().required('Start date is a required field'),
  from: yup.string().required('End date is a required field'),
  type: yup.string().required('Type of leave is a required field'),
});

const defaultValuesAdd = {
  type: '',
  from: '',
  to: '',
};

const LeaveForm = ({ handleOnClick, leave, isEditForm = true }: LeaveProps) => {
  const defaultValuesEdit = {
    status: leave?.status || '',
  };
  const { user } = useContext(AuthContext);
  const { updateLeaves } = useContext(CacheContext);
  const onSubmitEdit = async ({ status }: FormFieldTypesEdit) => {
    const leaveResponse: LeaveAPI = await updateLeaveById({
      status: status as StatusType,
      leaveId: leave?.id || '',
    });
    if (leaveResponse?.data) {
      renderToast(leaveResponse, 'Leave has been updated!');
    } else {
      renderToast(leaveResponse);
    }
  };
  const onSubmitAdd = async ({ to, from, type }: FormFieldTypesAdd) => {
    const leaveResponse: LeaveAPI = await postNewLeave({
      type: type as Type_of_leaveType,
      to: new Date(to),
      from: new Date(from),
      userId: user?.userId || '',
    });
    if (leaveResponse?.data) {
      renderToast(leaveResponse, 'Leave has been added!');
    } else {
      renderToast(leaveResponse);
    }
  };
  const renderToast = (leaveResponse: LeaveAPI, message?: string) => {
    if (leaveResponse?.data && message) {
      updateLeaves(null);
      Toast({ message, id: 'LeaveToastSuccess' });
    } else {
      if (leaveResponse?.errors) {
        leaveResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'LeaveToastError',
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
          <Heading className="mb-[24px]" type="H3" content="Edit leave" />
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
          <Heading className="mb-[24px]" type="H3" content="Add leave" />
          <Select
            required
            options={leavesList}
            name="type"
            label="Type of leave:"
          />
          <Input required type="date" name="from" label="Start date:" />
          <Input required type="date" name="to" label="End date:" />
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
export default LeaveForm;
