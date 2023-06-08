import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';

import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { ProjectType } from 'src/Types';
import { postNewProject, updateProjectById } from 'src/API/project';
import { CacheContext } from '../Context/CacheProvider';
import { useContext, useState } from 'react';
import { Toast } from 'src/utils/toastGenerator';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';

interface ProjectProps {
  handleOnClick: () => void;
  project?: ProjectType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
}
interface ProjectAPI {
  data?: Array<ProjectType>;
  errors?: Array<{ error: string }>;
}
interface FormFieldTypes {
  name: string;
  start: string;
  deadline: string;
  description: string;
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
  setIsFormOpen,
}: ProjectProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const { isMobile } = useBreakpoint();
  const defaultValuesEdit = {
    name: project?.name || '',
    start: project?.created_at || '',
    deadline: project?.deadline || '',
    description: project?.description || '',
  };
  const { updateProjects } = useContext(CacheContext);

  const onSubmit = async ({
    name,
    start,
    deadline,
    description,
  }: FormFieldTypes) => {
    setIsLoading(true);
    let roleResponse: ProjectAPI | null = null;
    if (isEditForm) {
      // Handle edit form network request
      roleResponse = await updateProjectById({
        name,
        start_date: new Date(start),
        deadline: new Date(deadline),
        description,
        projectId: project?.id || '',
      });
      if (roleResponse?.data) {
        updateProjects(null);
        Toast({
          message: 'Role has been updated!',
          id: 'postProjectToastSuccess',
        });
      }
    } else {
      // Handle add form network request
      roleResponse = await postNewProject({
        name,
        start_date: new Date(start),
        deadline: new Date(deadline),
        description,
      });
      if (roleResponse?.data) {
        updateProjects(null);
        Toast({
          message: 'Role has been added!',
          id: 'postProjectToastSuccess',
        });
      }
    }
    if (roleResponse?.errors) {
      roleResponse?.errors.map((errorMessage) =>
        Toast({
          //message: errorMessage?.error || errorMessage?.msg || '',
          message: 'Error',
          id: 'postProjectToastError',
          isSuccess: false,
        })
      );
    }
    setIsLoading(false);
    setIsFormOpen(false);
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
        <div className=" tablet:flex tablet:flex-col desktop:flex-row desktop:justify-end">
          <Button
            className="desktop:ml-4 order-2"
            type="submit"
            variant="addButton"
          >
            {/* {!isLoading ? 'Edit' : <Loader />} */}
            {isLoading ? <Loader /> : isEditForm ? 'Edit' : 'Add'}
          </Button>
          {!isMobile && isEditForm ? (
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
      {isRemoveModal && (
        <RemoveModal
          Entity={Entities.PROJECT}
          name={project?.name}
          handleOnClick={closeRemoveModal}
          id={project?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default ProjectForm;
