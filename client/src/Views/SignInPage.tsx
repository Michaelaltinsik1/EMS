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
import Loader from 'src/Components/Base/Loader';

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
    console.log('email: ', formFields.email);
    console.log('password:', formFields.password);

    setIsLoading(true);
    const data = await signIn(formFields.email, formFields.password);
    if (data && data?.status === 200) {
      handleSignInPermissions({
        userId: data.value.id,
        permission: data.value.permission,
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
      });
    }

    setIsLoading(false);
    console.log(data);
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center tablet:px-[80px] px-4 ${
        theme === Theme.LIGHT ? 'bg-gray-50' : 'bg-gray-700'
      }`}
    >
      <Button type="button" variant="addButton">
        test button1
      </Button>
      <Button type="button" variant="removeButton">
        test button2
      </Button>
      <Button type="button" variant="confirmRemoveButton">
        test button3
      </Button>
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
      <ThemeButton />
    </div>
  );
};
export default SignInPage;
