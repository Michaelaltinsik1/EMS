import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

interface updateDepartmentType extends createDepartmentType {
  country: string;
  zip: string;
  city: string;
  departmentId: string;
}

interface createDepartmentType {
  name: string;
  budget: number;
}

export async function createNewDepartment({
  name,
  budget,
}: createDepartmentType) {
  const response = await axios
    .post(`/departments`, { name, budget })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

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

export async function updateDepartmentById({
  city,
  country,
  zip,
  name,
  budget,
  departmentId,
}: updateDepartmentType) {
  const response = await axios
    .put(`/departments/${departmentId}`, {
      name,
      budget,
      city,
      country,
      zip,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function deleteDepartmentById(departmentId: string) {
  const response = await axios
    .delete(`/departments/${departmentId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
