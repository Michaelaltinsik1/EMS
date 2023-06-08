import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Button from 'src/Components/Base/Button';
import * as yup from 'yup';
import Modal from '../Modal';
import Heading from 'src/Components/Base/Heading';
import { RoleType } from 'src/Types';
import { postNewRole, updateRoleById } from 'src/API/role';
import { Toast } from 'src/utils/toastGenerator';
import { CacheContext } from '../Context/CacheProvider';
import { useContext, useState } from 'react';
import Loader from 'src/Components/Base/Loader';
import { useBreakpoint } from '../hooks/useBreakpoint';
import RemoveModal from '../RemoveModal';
import { Entities } from 'src/Types/enums';

interface RoleProps {
  handleOnClick: () => void;
  role?: RoleType;
  isEditForm?: boolean;
  setIsFormOpen: (newValue: boolean) => void;
}
interface RolesAPI {
  data?: RoleType;
  errors?: Array<{ error?: string; msg?: string }>;
}
const validationSchemaEdit = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Requires atleast 2 characters')
    .max(255, 'Maximum of 255 characters'),
});
const validationSchemaAdd = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Requires atleast 2 characters')
    .max(255, 'Maximum of 255 characters'),
});
const defaultValuesAdd = {
  name: '',
};
interface FormFieldTypes {
  name: string;
}
const RoleForm = ({
  handleOnClick,
  role,
  isEditForm = true,
  setIsFormOpen,
}: RoleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveModal, setIsRemoveModal] = useState<boolean>(false);
  const closeRemoveModal = () => {
    setIsRemoveModal(false);
  };
  const { isMobile } = useBreakpoint();
  const { updateRoles } = useContext(CacheContext);
  const defaultValuesEdit = {
    name: role?.name || '',
  };
  const onSubmit = async ({ name }: FormFieldTypes) => {
    setIsLoading(true);

    let roleResponse: RolesAPI | null = null;
    if (isEditForm) {
      roleResponse = await updateRoleById({ name, roleId: role?.id || '' });
    } else {
      roleResponse = await postNewRole(name);
    }
    if (roleResponse?.data) {
      updateRoles(null);
      Toast({ message: 'Role has been added', id: 'GetAllRolesToast' });
    } else {
      console.log(roleResponse?.errors);
      if (roleResponse?.errors) {
        console.log('an error happened');
        roleResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage?.error || errorMessage?.msg || '',
            id: 'PostRoleErrorToast',
            isSuccess: false,
          })
        );
      }
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
          <Heading className="mb-[24px]" type="H3" content="Edit role" />
        ) : (
          <Heading className="mb-[24px]" type="H3" content="Add role" />
        )}
        <Input required type="text" name="name" label="Name:" />
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
          Entity={Entities.ROLE}
          name={role?.name}
          handleOnClick={closeRemoveModal}
          id={role?.id || ''}
          setIsFormOpen={setIsFormOpen}
        />
      )}
    </Modal>
  );
};
export default RoleForm;
