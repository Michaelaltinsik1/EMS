import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'src/API';
import { Toast } from 'src/utils/toastGenerator';
import ThemeButton from 'src/Components/Features/ThemeButton';
import { useContext } from 'react';
import { ThemeContext } from 'src/Components/Features/ThemeProvider';
import { AuthContext } from 'src/Components/Features/AuthProvider';
import Input from 'src/Components/Base/Input';
import { Theme } from 'src/Types/enums';
import Button from 'src/Components/Base/Button';
import { PermissionType } from 'src/Types';

const SignInPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user, handleSignInPermissions } = useContext(AuthContext);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsLoading(true);
    const data = await signIn(email, password);
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

      // handleSignInPermissions({
      //   userId: data.value.id,
      //   permission: data.value.permission,
      // });
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
      <form
        className={`flex flex-col min-w-[100%] px-4 py-[80px] tablet:px-[40px] tablet:py-[100px] tabletEdgeCases:min-w-[880px] desktop:py-[96px] desktop:px-[80px] xlDesktop:[px-160px] rounded-[24px] ${
          theme === Theme.LIGHT
            ? 'bg-gray-200 shadow-lightShadow'
            : 'bg-gray-800 shadow-darkShadow'
        }`}
      >
        <Input
          onChangeHandler={setEmail}
          className="mb-[24px]"
          name="email"
          type="email"
          label="Email: "
          placeholder="Anna.andersson@hotmail.se"
        />
        <Input
          onChangeHandler={setPassword}
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
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        >
          Sign in
        </Button>
      </form>
      <ThemeButton />
      {/* <Input name="test" type="text" label="Password1: " /> */}
    </div>
  );
};
export default SignInPage;
