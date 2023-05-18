import { UserType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getUsers() {
  const user = await axios
    .get<ApiResponse<UserType[]>>('/users')
    .then((response) => {
      return { status: response?.status, value: response.data?.data };
    })
    .catch((e) => {
      return { status: e?.response?.status, value: e?.response?.data?.errors };
    });
  return user;
}

export async function deleteUserById() {}
export async function getUserById() {}
export async function createNewUser() {}
export async function updateUserById() {}
export async function connectExisitingAddress() {}
export async function changePassword() {}

export async function getProjectsByUserId() {}
