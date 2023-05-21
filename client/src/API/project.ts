import { ProjectType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function postNewProject() {}
export async function getAllProjects(id: string) {
  const response = await axios
    .get(`/users/${id}/projects`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function updateProjectById() {}
export async function getProjectsWithEmployeeID(id: string) {
  const response = await axios
    .get(`/users/${id}/projects/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function addEmployeeToProject() {}
export async function deleteProjectById() {}
