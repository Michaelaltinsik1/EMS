import { useEffect, useState } from 'react';
import { getAllDepartments } from 'src/API/department';
import Card from 'src/Components/Features/Cards';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import DepartmentForm from 'src/Components/Features/Forms/DepartmentForm';
import Table from 'src/Components/Features/Tables';
import { useBreakpoint } from 'src/Components/Features/hooks/useBreakpoint';
import { DepartmentType } from 'src/Types';
import { TaskTypes } from 'src/utils/enum';
import { Toast } from 'src/utils/toastGenerator';

interface DepartmentsAPI {
  data?: Array<DepartmentType>;
  errors?: Array<{ error: string }>;
}

const DepartmentPageAdmin = () => {
  const [departments, setDepartments] = useState<Array<DepartmentType>>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getDepartments = async () => {
      const departments: DepartmentsAPI = await getAllDepartments();
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
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add department"
      />
      <div className="p-4">
        <h1>Admin Department page</h1>
        {isMobile ? (
          departments.map((department) => (
            <Card department={department} key={department.id} />
          ))
        ) : (
          <Table type={TaskTypes.DEPARTMENT} data={departments} />
        )}
      </div>
      {isFormOpen && (
        <DepartmentForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default DepartmentPageAdmin;
