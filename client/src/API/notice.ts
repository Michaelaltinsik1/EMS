import { NoticeType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getAllNotices() {}
export async function getUserNoticeById() {}
export async function updateNoticeById() {}
export async function postNewNotice() {}
export async function deleteNotice() {}
