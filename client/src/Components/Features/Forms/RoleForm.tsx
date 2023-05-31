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
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({});
const validationSchemaAdd = yup.object({});
const defaultValuesAdd = {
  name: '',
};

const RoleForm = ({ handleOnClick, role, isEditForm = true }: RoleProps) => {
  const defaultValuesEdit = {
    name: role.name,
  };
  const onSubmit = () => {
    if (isEditForm) {
      // Handle edit form network request
    } else {
      // Handle add form network request
    }
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={isEditForm ? defaultValuesEdit : defaultValuesAdd}
        validationSchema={
          isEditForm ? validationSchemaEdit : validationSchemaAdd
        }
        onSubmit={onSubmit}
      >
        {isEditForm ? (
          <Heading className="mb-[24px]" type="H3" content="Edit role" />
        ) : (
          <Heading className="mb-[24px]" type="H3" content="Add role" />
        )}
        <Select options={[]} name="role" label="Role:" />
        <Button type="submit" variant="addButton">
          {isEditForm ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </Modal>
  );
};
export default RoleForm;
