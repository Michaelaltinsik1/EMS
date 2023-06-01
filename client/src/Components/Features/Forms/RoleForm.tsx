import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { RoleType } from 'src/Types';
import { postNewRole } from 'src/API/role';
import { Toast } from 'src/utils/toastGenerator';
import { CacheContext } from '../Context/CacheProvider';
import { useContext } from 'react';
interface RoleProps {
  handleOnClick: () => void;
  role?: RoleType;
  isEditForm?: boolean;
}
interface RolesAPI {
  data?: RoleType;
  errors?: Array<{ error?: string; msg?: string }>;
}
const validationSchemaEdit = yup.object({});
const validationSchemaAdd = yup.object({});
const defaultValuesAdd = {
  name: '',
};
interface FormFieldTypes {
  name: string;
}
const RoleForm = ({ handleOnClick, role, isEditForm = true }: RoleProps) => {
  const { updateRoles } = useContext(CacheContext);
  const defaultValuesEdit = {
    name: role?.name || '',
  };
  const onSubmit = async ({ name }: FormFieldTypes) => {
    console.log('Name: ', name);
    let role: RolesAPI | null = null;
    if (isEditForm) {
      // Handle edit form network request
    } else {
      // Handle add form network request
      role = await postNewRole(name);
      console.log('Role: ', role);
    }
    if (role?.data) {
      updateRoles(null);
      Toast({ message: 'Role has been added', id: 'GetAllRolesToast' });
    } else {
      console.log(role?.errors);
      if (role?.errors) {
        console.log('an error happened');
        role?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage?.error || errorMessage?.msg || '',
            id: 'PostRoleErrorToast',
            isSuccess: false,
          })
        );
      }
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
        <Input type="text" name="name" label="name:" />
        <Button className="desktop:self-end" type="submit" variant="addButton">
          {isEditForm ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </Modal>
  );
};
export default RoleForm;