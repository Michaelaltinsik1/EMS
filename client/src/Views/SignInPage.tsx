import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'src/API';
import { Toast } from 'src/utils/toastGenerator';
import ThemeButton from 'src/Components/Features/ThemeButton';
import { useContext } from 'react';
import { ThemeContext } from 'src/Components/Features/Context/ThemeProvider';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import Input from 'src/Components/Base/Input';
import { Theme } from 'src/Types/enums';
import Button from 'src/Components/Base/Button';
import Form from 'src/Components/Base/Form';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Invalid formate').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Minimum of 8 charcters'),
});

const defaultValues = {
  email: '',
  password: '',
};
interface FormSubmitType {
  email: string;
  password: string;
}
const SignInPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { handleSignInPermissions } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(formFields: FormSubmitType) {
    setIsLoading(true);
    const data = await signIn(formFields.email, formFields.password);
    if (data && data?.status === 200) {
      handleSignInPermissions({
        userId: data.value.id,
        permission: data.value.permission,
        firstName: data.value.firstName,
        lastName: data.value.lastName,
      });
      if (data.value.permission === 'ADMIN') {
        navigate('/dashboard/admin');
      } else if (data.value?.permission === 'EMPLOYEE') {
        navigate('/dashboard/');
      }
    } else {
      handleSignInPermissions(null);
      Toast({
        message: 'Invalid credentials!',
        id: 'Sign-in-toast-id',
        isSuccess: false,
        theme: theme,
      });
    }

    setIsLoading(false);
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center tablet:px-[80px] px-4 ${
        theme === Theme.LIGHT ? 'bg-gray-50' : 'bg-gray-700'
      }`}
    >
      <div className="fixed top-4 right-4 tablet:top-[40px] tablet:right-[40px] desktop:top-[64px] desktop:right-[64px]">
        <ThemeButton />
      </div>
      <Form
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        className={`flex flex-col min-w-[100%] px-4 py-[80px] tablet:px-[40px] tablet:py-[100px] tabletEdgeCases:min-w-[880px] desktop:py-[96px] desktop:px-[80px] xlDesktop:[px-160px] rounded-[24px] ${
          theme === Theme.LIGHT
            ? 'bg-gray-200 shadow-lightShadow'
            : 'bg-gray-800 shadow-darkShadow'
        }`}
      >
        <Input
          className="mb-[24px]"
          name="email"
          type="email"
          label="Email: "
          placeholder="Anna.andersson@hotmail.se"
        />
        <Input
          className="mb-[32px]"
          name="password"
          type="password"
          label="Password: "
        />

        <Button
          className="self-end"
          variant="addButton"
          type="submit"
          loading={isLoading}
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
};
export default SignInPage;
