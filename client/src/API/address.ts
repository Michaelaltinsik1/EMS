import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

interface CreateAddress {
  country: string;
  city: string;
  zip: string;
  street: string;
}
interface UpdateAddress extends CreateAddress {
  id: string;
}

export async function getAddresses() {
  const response = await axios
    .get(`/addresses`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function getAddressById(addressId: string) {
  const response = await axios
    .get(`/addresses/${addressId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function postNewAddress({ city, country, zip }: CreateAddress) {
  const response = await axios
    .post(`/addresses`, { city, country, zip })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function updateUserAddressById({
  city,
  country,
  zip,
  street,
  id,
}: UpdateAddress) {
  const response = await axios
    .put(`/addresses`, { city, country, zip, street, id })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteAddress(addressId: string) {
  const response = await axios
    .delete(`/addresses/${addressId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
