import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

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
export async function getUserNoticeById() {}
export async function updateNoticeById() {}
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
export async function postNewNotice() {}

export async function deleteNotice() {}
