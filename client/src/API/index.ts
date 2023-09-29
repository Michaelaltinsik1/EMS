import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function signIn(email: string, password: string) {
  const user = await axios
    .post('/', { email, password })
    .then((response) => {
      return { status: response?.status, value: response.data?.data };
    })
    .catch((e) => {
      return { status: e?.response?.status, value: e?.response?.data?.errors };
    });
  return user;
}
