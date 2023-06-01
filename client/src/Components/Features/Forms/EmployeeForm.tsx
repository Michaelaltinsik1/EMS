import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { UserType } from 'src/Types';
import { CacheContext } from '../Context/CacheProvider';
import { useContext, useEffect } from 'react';
import { getAllRoles } from 'src/API/role';
import { getAllDepartments } from 'src/API/department';
import { countries } from 'src/utils/lists';
import { permissions } from 'src/utils/lists';
interface EmployeeFormProps {
  handleOnClick: () => void;
  user?: UserType;
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Za-z\s]*$/, 'Invalid formate'),
  salary: yup.string().required('Salary is a required field'),
  permission: yup.string().required('Permission is a required field'),
  department: yup.string().required('Department is a required field'),
  role: yup.string().required('Role is a required field'),
  country: yup
    .string()
    .required('Country is a required field')
    .min(2, 'Requires atleast 2 characters'),
  city: yup
    .string()
    .required('City is a required field')
    .min(2, 'Requires atleast 2 characters'),
  zip: yup
    .string()
    .required('Zip is a required field')
    .matches(/^\s?\d{5}\s?$/, 'Invalid zip code'),
});

const validationSchemaAdd = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Za-z\s]*$/, 'Invalid formate'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field'),

  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Requires atleast 8 characters'),
  salary: yup.string().required('Salary is a required field'),
  permission: yup.string().required('Permission is a required field'),
  birth: yup.string().required('Birth date is a required field'),
  department: yup.string().required('Department is a required field'),
  role: yup.string().required('Role is a required field'),
  country: yup
    .string()
    .required('Country is a required field')
    .min(2, 'Requires atleast 2 characters'),
  city: yup
    .string()
    .required('City is a required field')
    .min(2, 'Requires atleast 2 characters'),
  zip: yup
    .string()
    .required('Zip is a required field')
    .matches(/^\s?\d{5}\s?$/, 'Invalid zip code'),
});
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

interface FormFieldTypes {
  name: any;
}
const onSubmit = (value: any) => {
  console.log('Values: ', value);
  console.log('submit');
};

const EmployeeForm = ({
  handleOnClick,
  user,
  isEditForm = true,
}: EmployeeFormProps) => {
  const { roles, updateRoles, departments, updateDepartments } =
    useContext(CacheContext);
  console.log(roles);
  useEffect(() => {
    const getRoles = async () => {
      const rolesResponse = await getAllRoles();
      if (rolesResponse?.data) {
        updateRoles(rolesResponse.data);
      }
    };
    const getDepartments = async () => {
      const departmentResponse = await getAllDepartments();
      if (departmentResponse?.data) {
        updateDepartments(departmentResponse.data);
      }
    };
    if (roles === null) {
      getRoles();
    }
    if (departments === null) {
      getDepartments();
    }
  }, [departments, roles, updateDepartments, updateRoles]);
  const defaultValuesEdit = {
    name: (user?.firstName || '') + ' ' + (user?.lastName || ''),
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
          <Input required type="text" name="name" label="Name:" />
          <Input
            required
            type="number"
            name="salary"
            label="Yearly salarary (sek)"
          />
          <Select options={permissions} name="permission" label="Permission:" />
          <Select
            required
            options={
              departments?.map((department) => {
                return { name: department.name, id: department.id };
              }) || []
            }
            name="department"
            label="Department:"
          />
          <Select
            required
            options={
              roles?.map((role) => {
                return { name: role.name, id: role.id };
              }) || []
            }
            name="role"
            label="Role:"
          />
          <Select
            required
            options={countries}
            name="country"
            label="Country:"
          />
          <Input required type="text" name="city" label="City: " />
          <Input required type="number" name="zip" label="Zip code:" />
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
          <Input required type="text" name="name" label="Name:" />
          <Input required type="email" name="email" label="Email:" />
          <Input required type="password" name="password" label="Password:" />
          <Input
            required
            type="number"
            name="salary"
            label="Yearly salarary (sek)"
          />
          <Select
            required
            options={permissions}
            name="permission"
            label="Permission:"
          />
          <Select
            required
            options={
              departments?.map((department) => {
                return { name: department.name, id: department.id };
              }) || []
            }
            name="department"
            label="Department:"
          />
          <Select
            required
            options={
              roles?.map((role) => {
                return { name: role.name, id: role.id };
              }) || []
            }
            name="role"
            label="Role:"
          />
          <Input required type="date" name="birth" label="Date of birth: " />
          <Select
            required
            options={countries}
            name="country"
            label="Country:"
          />
          <Input required type="text" name="city" label="City: " />
          <Input required type="number" name="zip" label="Zip code:" />
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
