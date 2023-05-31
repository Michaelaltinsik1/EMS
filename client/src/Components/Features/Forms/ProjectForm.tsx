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
}

const validationSchema = yup.object({});

const onSubmit = () => {
  console.log('submit');
};

const ProjectForm = ({ handleOnClick, project }: ProjectProps) => {
  const defaultValues = {
    name: project.name,
    start: project.created_at,
    deadline: project.deadline,
    description: project?.description || '',
  };

  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Heading className="mb-[24px]" type="H3" content="Edit project" />
        <Input type="text" name="name" label="Name:" />
        <Input type="date" name="start" label="Start date:" />
        <Input type="date" name="deadline" label="Deadline:" />
        {/* Text area fix needed */}
        <Input type="text" name="description" label="Description:" />
        <Button type="submit" variant="addButton">
          Edit
        </Button>
      </Form>
    </Modal>
  );
};
export default ProjectForm;
