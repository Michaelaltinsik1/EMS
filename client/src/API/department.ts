import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function createNewDepartment() {}
export async function getAllDepartments() {
  const response = await axios
    .get(`/departments`)
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
