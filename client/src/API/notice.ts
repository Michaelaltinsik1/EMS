import { NoticeType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getAllNotices(id: string) {
  const response = await axios
    .get(`/users/${id}/notices`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getUserNoticeById() {}
export async function updateNoticeById() {}
export async function getNoticeByUserId(id: string) {
  const response = await axios
    .get(`/users/${id}/notices/${id}/byUserId`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function postNewNotice() {}

export async function deleteNotice() {}
