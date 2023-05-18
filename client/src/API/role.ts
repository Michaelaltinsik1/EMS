import { RoleType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function postNewRole() {}
export async function getAllRoles() {}
export async function updateRoleById() {}
export async function deleteRoleById() {}
