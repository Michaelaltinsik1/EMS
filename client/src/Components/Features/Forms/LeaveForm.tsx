import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { LeaveType } from 'src/Types';
import Input from 'src/Components/Base/Input';

interface LeaveProps {
  handleOnClick: () => void;
  leave: LeaveType;
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({});
const validationSchemaAdd = yup.object({});

const defaultValuesAdd = {
  type: '',
  from: '',
  to: '',
};
const onSubmit = () => {
  console.log('submit');
};

const LeaveForm = ({ handleOnClick, leave, isEditForm = true }: LeaveProps) => {
  const defaultValuesEdit = {
    status: leave.status,
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmit}
        >
          <Heading className="mb-[24px]" type="H3" content="Edit leave" />
          <Select
            options={['PENDING', 'ACCEPTED', 'REJECTED']}
            name="status"
            label="Status:"
          />
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
          <Heading className="mb-[24px]" type="H3" content="Add leave" />
          <Select options={[]} name="type" label="Status:" />
          <Input type="date" name="from" label="Start date:" />
          <Input type="date" name="to" label="End date:" />
          <Button type="submit" variant="addButton">
            Add
          </Button>
        </Form>
      )}
    </Modal>
  );
};
export default LeaveForm;
