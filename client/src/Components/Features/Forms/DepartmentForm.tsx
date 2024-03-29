import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { DepartmentType } from 'src/Types';
import { countries } from 'src/utils/lists';
import { useContext, useState } from 'react';
import { CacheContext } from '../Context/CacheProvider';
import { Toast } from 'src/utils/toastGenerator';
import { createNewDepartment, updateDepartmentById } from 'src/API/department';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';
import { ThemeContext } from '../Context/ThemeProvider';

interface DepartmentProps {
  handleOnClick: () => void;
  department?: DepartmentType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
}
interface FormFieldTypesEdit extends FormFieldTypesAdd {
  country: string;
  city: string;
  zip: string;
  street: string;
}
interface FormFieldTypesAdd {
  name: string;
  budget: string;
}
interface DepartmentsAPI {
  data?: DepartmentType;
  errors?: Array<{ error: string }>;
}
const validationSchemaEdit = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Requires atleast 2 characters'),
  budget: yup.string().required('Budget is a required field'),
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
  street: yup.string().required('Street is a required field'),
});

const validationSchemaAdd = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Requires atleast 2 characters'),
  budget: yup.string().required('Budget is a required field'),
});

const defaultValuesAdd = {
  name: '',
  budget: '',
};

const DepartmentForm = ({
  handleOnClick,
  department,
  isEditForm = true,
  setIsFormOpen,
}: DepartmentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const defaultValuesEdit = {
    name: department?.name || '',
    budget: department?.budget || '',
    country: department?.addresses?.country || '',
    city: department?.addresses?.city || '',
    zip: department?.addresses?.zip || '',
    street: department?.addresses?.street || '',
  };
  const { updateDepartments } = useContext(CacheContext);
  const { theme } = useContext(ThemeContext);
  const { isMobile } = useBreakpoint();
  const onSubmitEdit = async ({
    name,
    budget,
    city,
    country,
    zip,
    street,
  }: FormFieldTypesEdit) => {
    setIsLoading(true);
    const leaveResponse: DepartmentsAPI = await updateDepartmentById({
      name,
      budget: Number(budget),
      city,
      country,
      zip,
      street,
      departmentId: department?.id || '',
    });
    if (leaveResponse?.data) {
      renderToast(leaveResponse, 'Department has been updated!');
    } else {
      renderToast(leaveResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };
  const onSubmitAdd = async ({ name, budget }: FormFieldTypesAdd) => {
    setIsLoading(true);
    const leaveResponse: DepartmentsAPI = await createNewDepartment({
      name,
      budget: Number(budget),
    });
    if (leaveResponse?.data) {
      renderToast(leaveResponse, 'Department has been added!');
    } else {
      renderToast(leaveResponse);
    }
    setIsLoading(false);
    setIsFormOpen(false);
  };
  const renderToast = (
    departmentResponse: DepartmentsAPI,
    message?: string
  ) => {
    if (departmentResponse?.data && message) {
      updateDepartments(null);
      Toast({ message, id: 'departmentToastSuccess', theme: theme });
    } else {
      if (departmentResponse?.errors) {
        departmentResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'departmentToastError',
            isSuccess: false,
            theme: theme,
          })
        );
      } else {
        Toast({
          message: 'Internal server error!',
          id: 'departmentToastError',
          isSuccess: false,
          theme: theme,
        });
      }
    }
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmitEdit}
        >
          <Heading className="mb-[24px]" type="H3" content="Edit department" />
          <Input required type="text" name="name" label="Name:" />
          <Input required type="number" name="budget" label="Budget:" />
          <Select
            required
            options={countries}
            name="country"
            label="Country:"
          />
          <Input required type="text" name="city" label="City: " />
          <Input required type="number" name="zip" label="Zip code:" />
          <Input required type="text" name="street" label="Street:" />
          <div className=" tablet:flex tablet:flex-col desktop:flex-row desktop:justify-end">
            <Button
              className="desktop:ml-4 order-2 "
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
          <Heading className="mb-[24px]" type="H3" content="Add department" />
          <Input required type="text" name="name" label="Name:" />
          <Input required type="number" name="budget" label="Budget:" />
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
          Entity={Entities.DEPARTMENT}
          name={department?.name}
          handleOnClick={closeRemoveModal}
          id={department?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default DepartmentForm;
