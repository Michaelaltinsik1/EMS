import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from './API';

function App() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = await signIn(email, password);
    console.log('Data:', data);
    if (data && data?.status === 200) {
      console.log('redirect');
      navigate('/dashboard');
    }
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
    </div>
  );
}

export default App;
