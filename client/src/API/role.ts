import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.baseURL = 'https://ems-t05h.onrender.com/';
axios.defaults.withCredentials = true;

interface updateRole {
  name: string;
  roleId: string;
}

export async function postNewRole(name: string) {
  const response = await axios
    .post(`/roles`, { name })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
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
export async function updateRoleById({ name, roleId }: updateRole) {
  const response = await axios
    .put(`/roles/${roleId}`, { name })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function deleteRoleById(roleId: string) {
  const response = await axios
    .delete(`/roles/${roleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
