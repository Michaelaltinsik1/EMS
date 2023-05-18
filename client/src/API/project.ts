import { ProjectType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function postNewProject() {}
export async function getAllProjects() {}
export async function updateProjectById() {}
export async function addEmployeeToProject() {}
export async function deleteProjectById() {}
