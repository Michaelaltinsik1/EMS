import { LeaveType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getAllLeaves(id: string) {
  const response = await axios
    .get<ApiResponse<LeaveType>>(
      `/users/2bc597e4-ec75-448f-ba6f-249550a33107/leaves`
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getLeavesByUserId() {}
export async function updateLeaveById() {}
export async function postNewLeave() {}
export async function deleteLeaveById() {}
