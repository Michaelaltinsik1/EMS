import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

export async function getAllTimeReports() {
  const response = await axios
    .get(`/timereports`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getTimeReportsByUserId(id: string) {
  const response = await axios
    .get(`/timereports/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function updateTimeReportById() {}
export async function postNewTimeReport() {}
export async function deleteTimeReport() {}
