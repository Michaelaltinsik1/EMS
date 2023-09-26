import Modal from '../Modal';
import Form from 'src/Components/Base/Form';
import Input from 'src/Components/Base/Input';
import Button from 'src/Components/Base/Button';
import Loader from 'src/Components/Base/Loader';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { Toast } from 'src/utils/toastGenerator';
import { ThemeContext } from '../Context/ThemeProvider';
import { changePassword } from 'src/API/user';
interface Password {
  userId: string;
  handleOnClick: () => void;
  closeForm: () => void;
}
interface FormFieldTypes {
  currPassword: string;
  newPassword: string;
}
const ChangePasswordForm = ({ handleOnClick, closeForm, userId }: Password) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const defaultValues = {
    currPassword: '',
    newPassword: '',
    repeatPassword: '',
  };
  const validationSchema = yup.object({
    currPassword: yup
      .string()
      .required('Current password is a required field')
      .min(8, 'Requires atleast 8 characters'),
    newPassword: yup
      .string()
      .required('New password is a required field')
      .min(8, 'Requires atleast 8 characters'),
    repeatPassword: yup
      .string()
      .required('Repeat password is a required field')
      .oneOf(
        [yup.ref('newPassword')],
        'Make sure Repeat password and New password match'
      )
      .min(8, 'Requires atleast 8 characters'),
  });

  const handleSubmit = async ({
    currPassword,
    newPassword,
  }: FormFieldTypes) => {
    setIsLoading(true);
    const updatePasswordResponse = await changePassword({
      currentPassword: currPassword,
      newPassword,
      userId,
    });
    if (updatePasswordResponse?.data) {
      renderToast(updatePasswordResponse, 'Password has been updated!');
      closeForm();
    } else {
      renderToast(updatePasswordResponse);
    }
    setIsLoading(false);
  };
  const renderToast = (departmentResponse: any, message?: string) => {
    if (departmentResponse?.data && message) {
      Toast({ message, id: 'changePasswordToastSuccess', theme: theme });
    } else {
      if (departmentResponse?.errors) {
        departmentResponse?.errors.map((errorMessage: any) =>
          Toast({
            message: errorMessage.error,
            id: 'changePasswordToastError',
            isSuccess: false,
            theme: theme,
          })
        );
      } else {
        Toast({
          message: 'Internal server error!',
          id: 'changePasswordToastError',
          isSuccess: false,
          theme: theme,
        });
      }
    }
  };

  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Input
          required
          type="password"
          name="currPassword"
          label="Current password: "
        />
        <Input
          required
          type="password"
          name="newPassword"
          label="New password:"
        />
        <Input
          required
          type="password"
          name="repeatPassword"
          label="Repeat password:"
        />
        <Button
          className="desktop:ml-4 order-2"
          type="submit"
          variant="addButton"
        >
          {!isLoading ? 'Update' : <Loader />}
        </Button>
      </Form>
    </Modal>
  );
};

export default ChangePasswordForm;
