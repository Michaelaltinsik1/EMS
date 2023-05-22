import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function postNewRole() {}
export async function getAllRoles() {
  const response = await axios
    .get(`/roles`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function updateRoleById() {}
export async function deleteRoleById() {}
