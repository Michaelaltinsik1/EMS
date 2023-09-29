import axios from 'axios';
import { StatusType } from 'src/Types';

//axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.baseURL = 'https://ems-t05h.onrender.com/';
axios.defaults.withCredentials = true;
interface UpdateTimereport {
  status: StatusType;
  timereportId: string;
}
interface CreateTimereport {
  from: Date;
  to: Date;
  userId: string;
}
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

export async function updateTimeReportById({
  status,
  timereportId,
}: UpdateTimereport) {
  const response = await axios
    .put(`/timereports/${timereportId}`, { status })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function postNewTimeReport({
  from,
  to,
  userId,
}: CreateTimereport) {
  const response = await axios
    .post(`/timereports/users/${userId}`, { from, to })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteTimeReport(timereportId: string) {
  const response = await axios
    .delete(`/timereports/${timereportId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
