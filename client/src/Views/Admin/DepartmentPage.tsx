import { useContext, useEffect, useState } from 'react';
import { getAllDepartments } from 'src/API/department';
import Loader from 'src/Components/Base/Loader';
import Card from 'src/Components/Features/Cards';
import Contentmanagement from 'src/Components/Features/ContentManagement';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';
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
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { departments, updateDepartments } = useContext(CacheContext);
  const { isMobile } = useBreakpoint();
  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const getDepartments = async () => {
      const departmentsResponse: DepartmentsAPI = await getAllDepartments();
      if (departmentsResponse?.data) {
        updateDepartments(departmentsResponse.data);
        // Toast({ message: 'Success', id: 'GetAllDepartmentsToastSuccess' });
      }
      // else {
      //   console.log(departmentsResponse.errors);
      //   if (departmentsResponse?.errors) {
      //     departmentsResponse?.errors.map((errorMessage: { error: string }) =>
      //       Toast({
      //         message: errorMessage.error,
      //         id: 'GetAllDepartmentsToastError',
      //         isSuccess: false,
      //       })
      //     );
      //   }
      // }
    };
    if (departments === null) {
      getDepartments();
    }
  }, [departments, updateDepartments]);
  return (
    <>
      <Contentmanagement
        toggleAddForm={toggleForm}
        buttonContent="Add department"
      />
      <div className="p-4">
        <h1>Admin Department page</h1>
        {departments ? (
          <>
            {isMobile ? (
              departments.map((department) => (
                <Card department={department} key={department.id} />
              ))
            ) : (
              <Table type={TaskTypes.DEPARTMENT} data={departments} />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full mt-20">
            <Loader isDotLoader={false} />
          </div>
        )}
      </div>
      {isFormOpen && (
        <DepartmentForm isEditForm={false} handleOnClick={toggleForm} />
      )}
    </>
  );
};
export default DepartmentPageAdmin;
