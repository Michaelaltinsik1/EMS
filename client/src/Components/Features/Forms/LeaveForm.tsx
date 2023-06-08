import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { LeaveType, StatusType } from 'src/Types';
import Input from 'src/Components/Base/Input';
import { statuses } from 'src/utils/lists';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { CacheContext } from '../Context/CacheProvider';
import { Toast } from 'src/utils/toastGenerator';
import { postNewLeave, updateLeaveById } from 'src/API/leave';
import { leavesList } from 'src/utils/lists';
import { Type_of_leaveType } from 'src/Types';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';
import { ThemeContext } from '../Context/ThemeProvider';

interface LeaveProps {
  handleOnClick: () => void;
  leave?: LeaveType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
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

const LeaveForm = ({
  handleOnClick,
  leave,
  isEditForm = true,
  setIsFormOpen,
}: LeaveProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const { isMobile } = useBreakpoint();
  const defaultValuesEdit = {
    status: leave?.status || '',
  };
  const { user } = useContext(AuthContext);
  const { updateLeaves } = useContext(CacheContext);
  const { theme } = useContext(ThemeContext);
  const onSubmitEdit = async ({ status }: FormFieldTypesEdit) => {
    setIsLoading(true);
    const leaveResponse: LeaveAPI = await updateLeaveById({
      status: status as StatusType,
      leaveId: leave?.id || '',
    });
    if (leaveResponse?.data) {
      renderToast(leaveResponse, 'Leave has been updated!');
    } else {
      renderToast(leaveResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };
  const onSubmitAdd = async ({ to, from, type }: FormFieldTypesAdd) => {
    setIsLoading(true);
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
    setIsLoading(false);
    setIsFormOpen(false);
  };
  const renderToast = (leaveResponse: LeaveAPI, message?: string) => {
    if (leaveResponse?.data && message) {
      updateLeaves(null);
      Toast({ message, id: 'LeaveToastSuccess', theme: theme });
    } else {
      if (leaveResponse?.errors) {
        leaveResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'LeaveToastError',
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
          <Heading className="mb-[24px]" type="H3" content="Edit leave" />
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
            {!isLoading ? 'Add' : <Loader />}
          </Button>
        </Form>
      )}
      {isRemoveModal && (
        <RemoveModal
          Entity={Entities.LEAVE}
          handleOnClick={closeRemoveModal}
          id={leave?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default LeaveForm;
