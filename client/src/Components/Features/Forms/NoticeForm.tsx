import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { NoticeType } from 'src/Types';
import Input from 'src/Components/Base/Input';

interface NoticeProps {
  handleOnClick: () => void;
  notice: NoticeType;
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({});
const validationSchemaAdd = yup.object({});
const defaultValuesAdd = {
  description: '',
};
const onSubmit = () => {
  console.log('submit');
};

const NoticeForm = ({
  handleOnClick,
  notice,
  isEditForm = true,
}: NoticeProps) => {
  const defaultValuesEdit = {
    status: notice.status,
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmit}
        >
          <Heading className="mb-[24px]" type="H3" content="Edit notice" />
          <Select options={[]} name="status" label="Status:" />
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
          <Heading className="mb-[24px]" type="H3" content="Add notice" />
          {/* Add text area here later */}
          <Input type="text" name="description" label="Description:" />
          <Button type="submit" variant="addButton">
            Add
          </Button>
        </Form>
      )}
    </Modal>
  );
};
export default NoticeForm;
