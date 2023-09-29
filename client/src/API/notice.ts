import axios from 'axios';
import { StatusType } from 'src/Types';

//axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.baseURL = 'https://ems-t05h.onrender.com/';
axios.defaults.withCredentials = true;

interface UpdateNotice {
  status: StatusType;
  noticeId: string;
}
interface CreateNotice {
  description: string;
  userId: string;
}
export async function getAllNotices() {
  const response = await axios
    .get(`/notices`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getUserNoticeById(noticeId: string) {
  const response = await axios
    .get(`/notices/${noticeId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function updateNoticeById({ status, noticeId }: UpdateNotice) {
  const response = await axios
    .put(`/notices/${noticeId}`, { status })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getNoticeByUserId(id: string) {
  const response = await axios
    .get(`/notices/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function postNewNotice({ userId, description }: CreateNotice) {
  const response = await axios
    .post(`/notices/users/${userId}`, { description })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteNotice(noticeId: string) {
  const response = await axios
    .delete(`/notices/${noticeId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
