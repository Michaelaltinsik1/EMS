import Form from 'src/Components/Base/Form';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { RoleType } from 'src/Types';

interface RoleProps {
  handleOnClick: () => void;
  role: RoleType;
}

const validationSchema = yup.object({});

const onSubmit = () => {
  console.log('submit');
};

const RoleForm = ({ handleOnClick, role }: RoleProps) => {
  const defaultValues = {
    name: role.name,
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Heading className="mb-[24px]" type="H3" content="Edit role" />
        <Select options={[]} name="role" label="Role:" />
        <Button type="submit" variant="addButton">
          Edit
        </Button>
      </Form>
    </Modal>
  );
};
export default RoleForm;
