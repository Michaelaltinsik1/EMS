import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { Time_reportType } from 'src/Types';
import Input from 'src/Components/Base/Input';
import { statuses } from 'src/utils/lists';
interface TimereportProps {
  handleOnClick: () => void;
  timereport?: Time_reportType;
  isEditForm?: boolean;
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
const onSubmit = () => {
  console.log('submit');
};

const TimereportForm = ({
  handleOnClick,
  timereport,
  isEditForm = true,
}: TimereportProps) => {
  const defaultValuesEdit = {
    status: timereport?.status || '',
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmit}
        >
          <Heading className="mb-[24px]" type="H3" content="Edit timereport" />
          <Select required options={statuses} name="status" label="Status:" />
          <Button type="submit" variant="addButton">
            Edit
          </Button>
        </Form>
      ) : (
        <Form
          defaultValues={defaultValuesAdd}
          validationSchema={validationSchemaAdd}
          onSubmit={onSubmit}
        >
          <Heading className="mb-[24px]" type="H3" content="Add timereport" />
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
export default TimereportForm;
