import { Time_reportType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}
// Needs a backend check
export async function getAllTimeReports(id: string) {
  const response = await axios
    .get(`/users/2bc597e4-ec75-448f-ba6f-249550a33107/timereports`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getTimeReportsByUserId() {}
export async function updateTimeReportById() {}
export async function postNewTimeReport() {}
export async function deleteTimeReport() {}
