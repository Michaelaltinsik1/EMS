import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { Time_reportType } from 'src/Types';
import Input from 'src/Components/Base/Input';
import { statuses } from 'src/utils/lists';
import { postNewTimeReport, updateTimeReportById } from 'src/API/timereport';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Toast } from 'src/utils/toastGenerator';
import { CacheContext } from '../Context/CacheProvider';
import { StatusType } from 'src/Types';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';

interface TimereportAPI {
  data?: Array<Time_reportType>;
  errors?: Array<{ error: string }>;
}
interface TimereportProps {
  handleOnClick: () => void;
  timereport?: Time_reportType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
}

interface FormFieldTypesEdit {
  status: string;
}
interface FormFieldTypesAdd {
  from: string;
  to: string;
}
const validationSchemaEdit = yup.object({
  status: yup.string().required('Status is a required field'),
});
const validationSchemaAdd = yup.object({
  to: yup.string().required('Start date is a required field'),
  from: yup.string().required('End date is a required field'),
});
const defaultValuesAdd = {
  from: '',
  to: '',
};

const TimereportForm = ({
  handleOnClick,
  timereport,
  isEditForm = true,
  setIsFormOpen,
}: TimereportProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const { isMobile } = useBreakpoint();
  const { user } = useContext(AuthContext);
  const { updateTimereports } = useContext(CacheContext);
  const defaultValuesEdit = {
    status: timereport?.status || '',
  };
  const onSubmitAdd = async ({ to, from }: FormFieldTypesAdd) => {
    setIsLoading(true);
    const timereportResponse: TimereportAPI = await postNewTimeReport({
      to: new Date(to),
      from: new Date(from),
      userId: user?.userId || '',
    });

    if (timereportResponse?.data) {
      renderToast(timereportResponse, 'Timereport has been added!!');
    } else {
      renderToast(timereportResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };
  const onSubmitEdit = async ({ status }: FormFieldTypesEdit) => {
    setIsLoading(true);
    if (statuses.some((currStatus) => currStatus.id === status)) {
      const timereportResponse: TimereportAPI = await updateTimeReportById({
        status: status as StatusType,
        timereportId: timereport?.id || '',
      });

      if (timereportResponse?.data) {
        renderToast(timereportResponse, 'Timereport has been updated!');
      } else {
        renderToast(timereportResponse);
      }
    } else {
      Toast({
        message: 'Invalid Status',
        id: 'postTimereportToastError',
        isSuccess: false,
      });
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };

  const renderToast = (rolesResponse: TimereportAPI, message?: string) => {
    if (rolesResponse?.data && message) {
      updateTimereports(null);
      Toast({ message, id: 'postTimereportToastSuccess' });
    } else {
      if (rolesResponse?.errors) {
        rolesResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'postTimereportToastError',
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
          <Heading className="mb-[24px]" type="H3" content="Edit timereport" />
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
          <Heading className="mb-[24px]" type="H3" content="Add timereport" />
          <Input
            required
            type="datetime-local"
            name="from"
            label="Start date:"
          />
          <Input required type="datetime-local" name="to" label="End date:" />
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
          Entity={Entities.TIMEREPORT}
          handleOnClick={closeRemoveModal}
          id={timereport?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default TimereportForm;
