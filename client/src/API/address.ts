import { AddressType } from 'src/Types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;
interface ApiResponse<T> {
  data: T;
}

export async function getAddresses() {}
export async function getAddressById() {}
export async function postNewAddress() {}
export async function updateUserAddressById() {}
export async function deleteAddress() {}
