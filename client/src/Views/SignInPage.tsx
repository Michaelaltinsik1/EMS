import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'src/API';
import { Toast } from 'src/utils/toastGenerator';
import ThemeButton from 'src/Components/Features/ThemeButton';

const SignInPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = await signIn(email, password);
    if (data && data?.status === 200) {
      if (data.value.permission === 'ADMIN') {
        navigate('/dashboard/admin');
      } else if (data.value?.permission === 'EMPLOYEE') {
        navigate('/dashboard/');
      }
    } else {
      Toast({
        message: 'Invalid credentials!',
        id: 'Sign-in-toast-id',
        isSuccess: false,
      });
    }
    console.log(data);
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="Emma.larsson@hotmail.com"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        <button onClick={(e) => handleSubmit(e)} type="submit">
          Sign in
        </button>
      </form>
      <ThemeButton />
    </div>
  );
};
export default SignInPage;
