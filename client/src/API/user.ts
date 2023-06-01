import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function getUsers() {
  const response = await axios
    .get('/users')
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteUserById() {}
export async function getUserById() {}
export async function createNewUser() {}
export async function updateUserById() {}
export async function connectExisitingAddress() {}
export async function changePassword() {}

export async function getProjectsByUserId() {}
