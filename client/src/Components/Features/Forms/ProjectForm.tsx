import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { ProjectType } from 'src/Types';

interface ProjectProps {
  handleOnClick: () => void;
  project?: ProjectType;
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Requires atleast 2 characters'),
  start: yup.string().required('Start date is a required field'),
  deadline: yup.string().required('End date is a required field'),
  description: yup.string().optional().max(1020, 'Maximum of 1020 characters'),
});

const validationSchemaAdd = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Requires atleast 2 characters'),
  start: yup.string().required('Start date is a required field'),
  deadline: yup.string().required('End date is a required field'),
  description: yup.string().optional().max(1020, 'Maximum of 1020 characters'),
});
const defaultValuesAdd = {
  name: '',
  start: '',
  deadline: '',
  description: '',
};

const ProjectForm = ({
  handleOnClick,
  project,
  isEditForm = true,
}: ProjectProps) => {
  const defaultValuesEdit = {
    name: project?.name || '',
    start: project?.created_at || '',
    deadline: project?.deadline || '',
    description: project?.description || '',
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
          <Heading className="mb-[24px]" type="H3" content="Edit project" />
        ) : (
          <Heading className="mb-[24px]" type="H3" content="Add project" />
        )}
        <Input required type="text" name="name" label="Name:" />
        <Input required type="date" name="start" label="Start date:" />
        <Input required type="date" name="deadline" label="Deadline:" />
        {/* Text area fix needed */}
        <Input type="text" name="description" label="Description:" />
        <Button className="desktop:self-end" type="submit" variant="addButton">
          {isEditForm ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </Modal>
  );
};
export default ProjectForm;
