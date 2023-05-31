import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { NoticeType } from 'src/Types';

interface NoticeProps {
  handleOnClick: () => void;
  notice: NoticeType;
}

const validationSchema = yup.object({});

const onSubmit = () => {
  console.log('submit');
};

const NoticeForm = ({ handleOnClick, notice }: NoticeProps) => {
  const defaultValues = {
    status: notice.status,
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Heading className="mb-[24px]" type="H3" content="Edit notice" />
        <Select options={[]} name="status" label="Status:" />
        <Button type="submit" variant="addButton">
          Edit
        </Button>
      </Form>
    </Modal>
  );
};
export default NoticeForm;
