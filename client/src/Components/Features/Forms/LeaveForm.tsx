import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { LeaveType } from 'src/Types';

interface LeaveProps {
  handleOnClick: () => void;
  leave: LeaveType;
}

const validationSchema = yup.object({});

const onSubmit = () => {
  console.log('submit');
};

const LeaveForm = ({ handleOnClick, leave }: LeaveProps) => {
  const defaultValues = {
    status: leave.status,
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Heading className="mb-[24px]" type="H3" content="Edit department" />
        <Select
          options={['PENDING', 'ACCEPTED', 'REJECTED']}
          name="status"
          label="Status:"
        />
        <Button type="submit" variant="addButton">
          Edit
        </Button>
      </Form>
    </Modal>
  );
};
export default LeaveForm;
