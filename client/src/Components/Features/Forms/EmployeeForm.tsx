import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { UserType } from 'src/Types';

interface EmployeeFormProps {
  handleOnClick: () => void;
  user?: UserType;
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({});
const validationSchemaAdd = yup.object({});
const defaultValuesAdd = {
  name: '',
  email: '',
  password: '',
  salary: '',
  permission: '',
  birth: '',
  department: '',
  role: '',
  country: '',
  city: '',
  zip: '',
};
const onSubmit = () => {
  console.log('submit');
};

const EmployeeForm = ({
  handleOnClick,
  user,
  isEditForm = true,
}: EmployeeFormProps) => {
  const defaultValuesEdit = {
    name: (user?.firstName || '') + +(user?.lastName || ''),
    salary: user?.salary || '',
    permission: user?.permission || '',
    department: user?.department || '',
    role: user?.role || '',
    country: '',
    city: '',
    zip: '',
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmit}
        >
          <Heading className="mb-[24px]" type="H3" content="Edit employee" />
          <Input type="text" name="name" label="Name:" />
          <Input type="number" name="salary" label="Yearly salarary (sek)" />
          <Select
            options={['EMPLOYEE', 'ADMIN']}
            name="permission"
            label="Permission:"
          />
          <Select options={[]} name="department" label="Department:" />
          <Select options={[]} name="role" label="Role:" />
          <Select options={[]} name="country" label="Country:" />
          <Input type="text" name="city" label="City: " />
          <Input type="number" name="zip" label="Zip code:" />
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
          <Heading className="mb-[24px]" type="H3" content="Add employee" />
          <Input type="text" name="name" label="Name:" />
          <Input type="email" name="email" label="Email:" />
          <Input type="password" name="password" label="Password:" />
          <Input type="number" name="salary" label="Yearly salarary (sek)" />
          <Select
            options={['EMPLOYEE', 'ADMIN']}
            name="permission"
            label="Permission:"
          />
          <Select options={[]} name="department" label="Department:" />
          <Select options={[]} name="role" label="Role:" />
          <Input type="date" name="birth" label="Date of birth: " />
          <Select options={[]} name="country" label="Country:" />
          <Input type="text" name="city" label="City: " />
          <Input type="number" name="zip" label="Zip code:" />
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
export default EmployeeForm;
