import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormProps {
  defaultValues: any;
  children: JSX.Element | JSX.Element[];
  onSubmit: (values: any) => void;
  validationSchema: any;
  className?: string;
}

const Form = ({
  defaultValues,
  children,
  onSubmit,
  validationSchema,
  className = '',
}: FormProps) => {
  const methods = useForm<FormData>({
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;
  const getFormFields = () => {
    onSubmit(methods.getValues());
  };

  return (
    <form
      className={`flex flex-col ${className}`}
      onSubmit={handleSubmit(getFormFields)}
    >
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
                errors: methods.formState.errors,
              },
            })
          : child;
      })}
    </form>
  );
};
export default Form;
