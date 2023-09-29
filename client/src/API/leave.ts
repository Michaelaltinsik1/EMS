import axios from 'axios';
import { StatusType, Type_of_leaveType } from 'src/Types';
//axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.baseURL = 'https://ems-t05h.onrender.com/';
axios.defaults.withCredentials = true;

interface UpdateLeave {
  status: StatusType;
  leaveId: string;
}
interface CreateLeave {
  type: Type_of_leaveType;
  from: Date;
  to: Date;
  userId: string;
}

export async function getAllLeaves() {
  const response = await axios
    .get(`/leaves`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
export async function getLeavesByUserId(id: string) {
  const response = await axios
    .get(`/leaves/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function updateLeaveById({ status, leaveId }: UpdateLeave) {
  const response = await axios
    .put(`/leaves/${leaveId}`, { status })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function postNewLeave({ type, from, to, userId }: CreateLeave) {
  const response = await axios
    .post(`/leaves/users/${userId}`, { type_of_leave: type, from, to })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteLeaveById(leaveId: string) {
  const response = await axios
    .delete(`/leaves/${leaveId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
