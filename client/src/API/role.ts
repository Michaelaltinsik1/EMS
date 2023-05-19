import { RoleType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function postNewRole() {}
export async function getAllRoles(id: string) {
  const response = await axios
    .get(`/users/${id}/roles`)
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
