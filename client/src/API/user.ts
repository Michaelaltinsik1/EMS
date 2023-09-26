import axios from 'axios';
import { PermissionType } from 'src/Types';
axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

interface CreateUser extends UpdateUser {
  email: string;
  password: string;
  date_of_birth: string;
}

interface UpdateUser {
  firstName: string;
  lastName: string;
  salary: Number;
  permission: PermissionType;
  roleId: string;
  departmentId: string;
  addressId?: string;
  country: string;
  city: string;
  zip: string;
  street: string;
  userId?: string;
}

interface ConnectAddress {
  userId: string;
  addressId: string;
}

interface ChangePassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}
export async function getUsers() {
  const response = await axios
    .get('/users')
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteUserById(userId: string) {
  const response = await axios
    .delete(`/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function getUserById(userId: string) {
  const response = await axios
    .get(`/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function createNewUser({
  firstName,
  lastName,
  email,
  password,
  salary,
  permission,
  date_of_birth,
  roleId,
  departmentId,
  country,
  zip,
  city,
}: CreateUser) {
  const response = await axios
    .post(`/users`, {
      firstName,
      lastName,
      email,
      password,
      salary,
      permission,
      date_of_birth,
      roleId,
      departmentId,
      country,
      zip,
      city,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function updateUserById({
  firstName,
  lastName,
  salary,
  permission,
  roleId,
  departmentId,
  addressId,
  country,
  zip,
  city,
  street,
  userId,
}: UpdateUser) {
  const response = await axios
    .put(`/users`, {
      firstName,
      lastName,
      salary,
      permission,
      roleId,
      departmentId,
      addressId,
      country,
      zip,
      street,
      city,
      id: userId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function connectExisitingAddress({
  userId,
  addressId,
}: ConnectAddress) {
  const response = await axios
    .put(`/users/connect`, {
      userId,
      addressId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function changePassword({
  userId,
  newPassword,
  currentPassword,
}: ChangePassword) {
  const response = await axios
    .put(`/users/${userId}/change-password`, {
      newPassword,
      currentPassword,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function getProjectsByUserId(userId: string) {
  const response = await axios
    .get(`/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
