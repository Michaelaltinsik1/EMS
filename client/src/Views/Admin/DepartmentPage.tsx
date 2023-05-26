import { useEffect, useState } from 'react';
import { getAllDepartments } from 'src/API/department';
import Card from 'src/Components/Features/Cards';
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
    <div className="p-4">
      <h1>Admin Department page</h1>
      {departments.map((department) => (
        <Card department={department} key={department.id} />
      ))}
    </div>
  );
};
export default DepartmentPageAdmin;
