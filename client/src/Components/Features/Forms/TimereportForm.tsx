import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { Time_reportType } from 'src/Types';

interface TimereportProps {
  handleOnClick: () => void;
  timereport: Time_reportType;
}

const validationSchema = yup.object({});

const onSubmit = () => {
  console.log('submit');
};

const TimereportForm = ({ handleOnClick, timereport }: TimereportProps) => {
  const defaultValues = {
    status: timereport.status,
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Heading className="mb-[24px]" type="H3" content="Edit timereport" />
        <Select options={[]} name="status" label="Status:" />
        <Button type="submit" variant="addButton">
          Edit
        </Button>
      </Form>
    </Modal>
  );
};
export default TimereportForm;
