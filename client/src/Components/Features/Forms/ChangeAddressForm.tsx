import Form from 'src/Components/Base/Form';
import * as yup from 'yup';
import Input from 'src/Components/Base/Input';
import Select from 'src/Components/Base/Select';
import { countries } from 'src/utils/lists';
import Button from 'src/Components/Base/Button';
import Loader from 'src/Components/Base/Loader';
import { updateUserAddressById } from 'src/API/address';
import { useContext, useState } from 'react';
import Modal from '../Modal';

import { AddressType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
import { ThemeContext } from '../Context/ThemeProvider';
import { CacheContext } from '../Context/CacheProvider';
interface Address {
  country: string;
  city: string;
  zip: string;
  street: string;
  id: string;
  handleOnClick: () => void;
  closeForm: () => void;
}
interface AddressAPI {
  data?: AddressType;
  errors?: Array<{ error: string }>;
}

interface FormFieldTypes {
  country: string;
  city: string;
  zip: string;
  street: string;
}
const ChangeAddressForm = ({
  country,
  city,
  zip,
  street,
  id,
  handleOnClick,
  closeForm,
}: Address) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { updateEmployee } = useContext(CacheContext);
  const defaultValues = {
    country: country,
    city: city,
    zip: zip,
    street: street,
  };
  const validationSchema = yup.object({
    country: yup
      .string()
      .required('Country is a required field')
      .min(2, 'Requires atleast 2 characters'),
    city: yup
      .string()
      .required('City is a required field')
      .min(2, 'Requires atleast 2 characters'),
    zip: yup
      .string()
      .required('Zip is a required field')
      .matches(/^\s?\d{5}\s?$/, 'Invalid zip code'),
    street: yup.string().required('Street is a required field'),
  });

  const handleSubmit = async ({
    city,
    country,
    zip,
    street,
  }: FormFieldTypes) => {
    setIsLoading(true);
    const updateAddressResponse: AddressAPI = await updateUserAddressById({
      city,
      country,
      zip,
      street,
      id,
    });
    if (updateAddressResponse?.data) {
      renderToast(updateAddressResponse, 'Address has been updated!');
      updateEmployee(null);
      closeForm();
    } else {
      renderToast(updateAddressResponse);
    }
    setIsLoading(false);
  };
  const renderToast = (departmentResponse: AddressAPI, message?: string) => {
    if (departmentResponse?.data && message) {
      Toast({ message, id: 'changeAddressToastSuccess', theme: theme });
    } else {
      if (departmentResponse?.errors) {
        departmentResponse?.errors.map((errorMessage) =>
          Toast({
            message: errorMessage.error,
            id: 'changeAddressToastError',
            isSuccess: false,
            theme: theme,
          })
        );
      } else {
        Toast({
          message: 'Internal server error!',
          id: 'changeAddressToastError',
          isSuccess: false,
          theme: theme,
        });
      }
    }
  };
  return (
    <Modal handleOnClick={handleOnClick}>
      <Form
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Select required options={countries} name="country" label="Country:" />
        <Input required type="text" name="city" label="City: " />
        <Input required type="number" name="zip" label="Zip code:" />
        <Input required type="text" name="street" label="Street:" />
        <Button
          className="desktop:ml-4 order-2"
          type="submit"
          variant="addButton"
        >
          {!isLoading ? 'Edit' : <Loader />}
        </Button>
      </Form>
    </Modal>
  );
};

export default ChangeAddressForm;
