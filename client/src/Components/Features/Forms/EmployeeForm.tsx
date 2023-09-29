import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { PermissionType, UserType } from 'src/Types';
import { CacheContext } from '../Context/CacheProvider';
import { useContext, useEffect, useState } from 'react';
import { getAllRoles } from 'src/API/role';
import { getAllDepartments } from 'src/API/department';
import { countries } from 'src/utils/lists';
import { permissions } from 'src/utils/lists';
import { createNewUser, updateUserById } from 'src/API/user';
import { Toast } from 'src/utils/toastGenerator';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';
import { ThemeContext } from '../Context/ThemeProvider';

interface EmployeeAPI {
  token?: string;
  data?: string;
  errors?: Array<{ error: string }>;
}
interface EmployeeFormProps {
  handleOnClick: () => void;
  user?: UserType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
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
  street: yup
    .string()
    .required('Street is a required field')
    .min(2, 'Requires atleast 2 characters'),
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
  street: yup
    .string()
    .required('Street is a required field')
    .min(2, 'Requires atleast 2 characters'),
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
  street: '',
};

interface FormFieldTypesEdit {
  name: string;
  salary: string;
  permission: string;
  department: string;
  role: string;
  country: string;
  city: string;
  zip: string;
  street: string;
}
interface FormFieldTypesAdd extends FormFieldTypesEdit {
  email: string;
  password: string;
  birth: string;
}

const EmployeeForm = ({
  handleOnClick,
  user,
  isEditForm = true,
  setIsFormOpen,
}: EmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const { isMobile } = useBreakpoint();
  const {
    roles,
    updateRoles,
    departments,
    updateDepartments,
    updateEmployees,
  } = useContext(CacheContext);
  const { theme } = useContext(ThemeContext);
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

  const onSubmitEdit = async ({
    name,
    salary,
    permission,
    department,
    role,
    country,
    city,
    zip,
    street,
  }: FormFieldTypesEdit) => {
    const splitedName = name.split(' ');
    const firstName = splitedName.shift() || '';
    const lastName = splitedName.join(' ');
    let currAddressId = '';
    if (user?.addresses && user?.addresses.length > 0) {
      currAddressId = user?.addresses[0].id;
    }
    setIsLoading(true);
    const employeeResponse: EmployeeAPI = await updateUserById({
      firstName,
      lastName,
      salary: Number(salary),
      permission: permission as PermissionType,
      departmentId: department,
      roleId: role,
      addressId: currAddressId,
      country,
      zip,
      city,
      street,
      userId: user?.id,
    });
    if (employeeResponse?.token || employeeResponse?.data) {
      renderToast(employeeResponse, 'Employee has been updated!');
    } else {
      renderToast(employeeResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };

  const onSubmitAdd = async ({
    name,
    salary,
    permission,
    department,
    role,
    country,
    city,
    zip,
    street,
    email,
    password,
    birth,
  }: FormFieldTypesAdd) => {
    console.log(street);
    const splitedName = name.split(' ');
    const firstName = splitedName.shift() || '';
    const lastName = splitedName.join(' ');
    setIsLoading(true);
    const employeeResponse: EmployeeAPI = await createNewUser({
      firstName,
      lastName,
      salary: Number(salary),
      permission: permission as PermissionType,
      departmentId: department,
      roleId: role,
      country,
      zip,
      city,
      street,
      email,
      password,
      date_of_birth: birth,
    });

    if (employeeResponse?.token || employeeResponse?.data) {
      renderToast(employeeResponse, 'Employee has been added!');
    } else {
      renderToast(employeeResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };

  const renderToast = (employeeResponse: EmployeeAPI, message?: string) => {
    if ((employeeResponse?.token || employeeResponse?.data) && message) {
      updateEmployees(null);
      Toast({ message, id: 'postEmployeeToastSuccess', theme: theme });
    } else {
      if (employeeResponse?.errors) {
        employeeResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'postEmployeeToastError',
            isSuccess: false,
            theme: theme,
          })
        );
      } else {
        Toast({
          message: 'Internal server error!',
          id: 'NoticeToastError',
          isSuccess: false,
          theme: theme,
        });
      }
    }
  };

  const defaultValuesEdit = {
    name: (user?.firstName || '') + ' ' + (user?.lastName || ''),
    salary: user?.salary || '',
    permission: user?.permission || '',
    department: user?.departmentId || '',
    role: user?.role && user.roleId ? user.roleId : '',
    country:
      user?.addresses && user?.addresses.length > 0
        ? user?.addresses[0].country
        : '',
    city:
      user?.addresses && user?.addresses.length > 0
        ? user?.addresses[0].city
        : '',
    zip:
      user?.addresses && user?.addresses.length > 0
        ? user?.addresses[0].zip
        : '',
    street:
      user?.addresses && user?.addresses.length > 0
        ? user?.addresses[0].street
        : '',
  };

  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmitEdit}
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
          <Input required type="text" name="street" label="Street: " />
          <div className=" tablet:flex tablet:flex-col desktop:flex-row desktop:justify-end">
            <Button
              className="desktop:ml-4 order-2"
              type="submit"
              variant="addButton"
            >
              {!isLoading ? 'Edit' : <Loader />}
            </Button>
            {!isMobile ? (
              <Button
                onClick={() => setIsRemoveModal(true)}
                className="desktop:mr-4 order-1 tablet:mb-[24px] desktop:mb-0"
                type="button"
                variant="removeButton"
              >
                remove
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Form>
      ) : (
        <Form
          defaultValues={defaultValuesAdd}
          validationSchema={validationSchemaAdd}
          onSubmit={onSubmitAdd}
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
          <Input required type="text" name="street" label="Street: " />
          <Button
            className="desktop:self-end"
            type="submit"
            variant="addButton"
          >
            {!isLoading ? 'Add' : <Loader />}
          </Button>
        </Form>
      )}
      {isRemoveModal && (
        <RemoveModal
          Entity={Entities.EMPLOYEE}
          name={user?.firstName + ' ' + user?.lastName}
          handleOnClick={closeRemoveModal}
          id={user?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default EmployeeForm;
