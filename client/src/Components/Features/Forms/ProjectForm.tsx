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
  project: ProjectType;
  isEditForm?: boolean;
}

const validationSchemaEdit = yup.object({});
const validationSchemaAdd = yup.object({});
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
    name: project.name,
    start: project.created_at,
    deadline: project.deadline,
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
        <Input type="text" name="name" label="Name:" />
        <Input type="date" name="start" label="Start date:" />
        <Input type="date" name="deadline" label="Deadline:" />
        {/* Text area fix needed */}
        <Input type="text" name="description" label="Description:" />
        <Button type="submit" variant="addButton">
          {isEditForm ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </Modal>
  );
};
export default ProjectForm;
