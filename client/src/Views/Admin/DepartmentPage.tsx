import { useEffect, useState } from 'react';
import { getAllDepartments } from 'src/API/department';
import { DepartmentType } from 'src/Types';
import { Toast } from 'src/utils/toastGenerator';
interface DepartmentsAPI {
  data?: Array<DepartmentType>;
  errors?: Array<{ error: string }>;
}

const DepartmentPageAdmin = () => {
  const [departments, setDepartments] = useState<Array<DepartmentType>>([]);
  useEffect(() => {
    const getDepartments = async () => {
      const departments: DepartmentsAPI = await getAllDepartments();
      console.log('Departments: ', departments);
      if (departments?.data) {
        setDepartments(departments.data);
        Toast({ message: 'Success', id: 'GetAllEmployeesToast' });
      } else {
        console.log(departments.errors);
        if (departments?.errors) {
          departments?.errors.map((errorMessage: { error: string }) =>
            Toast({
              message: errorMessage.error,
              id: 'GetAllEmployeesToast',
              isSuccess: false,
            })
          );
        }
      }
    };
    getDepartments();
  }, []);
  return (
    <div>
      <h1>Admin Department page</h1>
      {departments.map((department) => (
        <div key={department.id}>
          <h2>Name: {department.name}</h2>
          <p>Budget: {department.budget}</p>
          <p>Created at: {department.created_at.toString()}</p>
          <p>id: {department.id}</p>
        </div>
      ))}
    </div>
  );
};
export default DepartmentPageAdmin;
