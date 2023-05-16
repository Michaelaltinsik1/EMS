import { LeaveType } from '@src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getAllLeaves() {}
export async function getLeavesByUserId() {}
export async function updateLeaveById() {}
export async function postNewLeave() {}
export async function deleteLeaveById() {}
