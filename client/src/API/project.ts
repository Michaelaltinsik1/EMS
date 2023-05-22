import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function postNewProject() {}
export async function getAllProjects() {
  const response = await axios
    .get(`/projects`)
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
    .get(`/projects/users/${id}`)
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
