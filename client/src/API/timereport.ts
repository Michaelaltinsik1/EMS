import { Time_reportType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getAllTimeReports() {}
export async function getTimeReportsByUserId() {}
export async function updateTimeReportById() {}
export async function postNewTimeReport() {}
export async function deleteTimeReport() {}
