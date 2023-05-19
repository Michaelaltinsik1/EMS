import { DepartmentType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function createNewDepartment() {}
export async function getAllDepartments(id: string) {
  const response = await axios
    .get<ApiResponse<DepartmentType>>(`/users/${id}/departments`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function updateDepartmentById() {}
export async function deleteDepartmentById() {}
