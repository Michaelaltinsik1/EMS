import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function getAllLeaves() {
  const response = await axios
    .get(`/leaves`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getLeavesByUserId(id: string) {
  const response = await axios
    .get(`/leaves/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function updateLeaveById() {}
export async function postNewLeave() {}
export async function deleteLeaveById() {}
