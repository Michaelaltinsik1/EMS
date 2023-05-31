import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { DepartmentType } from 'src/Types';

interface DepartmentProps {
  handleOnClick: () => void;
  department: DepartmentType;
}

const validationSchema = yup.object({});

const onSubmit = () => {
  console.log('submit');
};

const DepartmentForm = ({ handleOnClick, department }: DepartmentProps) => {
  const defaultValues = {
    name: department.name,
    budget: department.budget,
    country: department?.addresses?.country || '',
    city: department?.addresses?.city || '',
    zip: department?.addresses?.zip || '',
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Heading className="mb-[24px]" type="H3" content="Edit department" />
        <Input type="text" name="name" label="Name:" />
        <Input type="number" name="budget" label="Budget:" />
        <Select options={[]} name="country" label="Country:" />
        <Input type="text" name="city" label="City: " />
        <Input type="number" name="zip" label="Zip code:" />
        <Button type="submit" variant="addButton">
          Edit
        </Button>
      </Form>
    </Modal>
  );
};
export default DepartmentForm;
