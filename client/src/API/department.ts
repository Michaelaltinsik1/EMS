import { DepartmentType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function createNewDepartment() {}
export async function getAllDepartments() {}
export async function updateDepartmentById() {}
export async function deleteDepartmentById() {}
