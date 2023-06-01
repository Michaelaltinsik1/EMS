import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { DepartmentType } from 'src/Types';
import { countries } from 'src/utils/lists';
interface DepartmentProps {
  handleOnClick: () => void;
  department?: DepartmentType;
  isEditForm?: boolean;
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

const onSubmit = () => {
  console.log('submit');
};

const DepartmentForm = ({
  handleOnClick,
  department,
  isEditForm = true,
}: DepartmentProps) => {
  const defaultValuesEdit = {
    name: department?.name || '',
    budget: department?.budget || '',
    country: department?.addresses?.country || '',
    city: department?.addresses?.city || '',
    zip: department?.addresses?.zip || '',
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      {isEditForm ? (
        <Form
          defaultValues={defaultValuesEdit}
          validationSchema={validationSchemaEdit}
          onSubmit={onSubmit}
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
          <Heading className="mb-[24px]" type="H3" content="Add department" />
          <Input required type="text" name="name" label="Name:" />
          <Input required type="number" name="budget" label="Budget:" />
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
export default DepartmentForm;
