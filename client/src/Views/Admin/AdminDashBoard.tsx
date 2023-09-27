import Heading from 'src/Components/Base/Heading';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import { getCounts } from 'src/API/user';

import Paragraph from 'src/Components/Base/Paragrapgh';
interface AllCountResponse {
  data: {
    projectCount: number;
    timereportCount: number;
    userCount: number;
    departmentCount: number;
    leaveCount: number;
    projectsCount: number;
    rolesCount: number;
    timeReportsCount: number;
    noticesCount: number;
  };
}
const AdminDashBoardPage = () => {
  const { user } = useContext(AuthContext);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [timereportsCount, setTimereportsCount] = useState<number>(0);
  const [departmentCount, setDepartmentCount] = useState<number>(0);
  const [leaveCount, setLeaveCount] = useState<number>(0);
  const [employeesCount, setEmployeesCount] = useState<number>(0);
  const [roleCount, setRoleCount] = useState<number>(0);
  const [noticeCount, setNoticeCount] = useState<number>(0);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    const getProjectsCount = async () => {
      const counts: AllCountResponse = await getCounts();

      if (counts?.data) {
        setEmployeesCount(counts.data.userCount);
        setDepartmentCount(counts.data.departmentCount);
        setLeaveCount(counts.data.leaveCount);
        setProjectsCount(counts.data.projectsCount);
        setRoleCount(counts.data.rolesCount);
        setTimereportsCount(counts.data.timeReportsCount);
        setNoticeCount(counts.data.noticesCount);
      }
    };
    getProjectsCount();
  }, []);
  return (
    <>
      <div className="p-4 desktop:py-[64px]">
        <div className="max-w-[1200px] mx-auto">
          <div className=" grid desktop:grid-cols-3 desktop:[&>div]:aspect-square desktop:[&>div]:w-full gap-4 desktop:gap-x-20  desktop:gap-y-0 desktop:[&>div]:mb-10 desktop:[&>div]:flex desktop:[&>div]:justify-center desktop:[&>div]:items-center ">
            <Heading
              className="desktop:mb-6 desktop:col-span-3"
              type="H2"
              content={`Welcome, ${capitalizeFirstLetter(
                user?.firstName || ''
              )} ${capitalizeFirstLetter(user?.lastName || '')}!`}
            />
            <Paragraph
              className="mb-2 desktop:col-span-3 desktop:mb-[32px]"
              type="body"
              content="Here is an overview of some key data."
            />
            <div className="p-6 w-full bg-orange-400 rounded-2xl">
              <p className="text-center text-h4 font-body font-bold">
                Employees: {employeesCount}{' '}
              </p>
            </div>
            <div className="p-6 w-full bg-yellow-400 rounded-2xl">
              <p className="text-center text-h4 font-body font-bold">
                Departments: {departmentCount}
              </p>
            </div>

            <div className="p-6 w-full bg-pink-400 rounded-2xl ">
              <p className="text-center text-h4 text-gray-50 font-body font-bold">
                Leaves: {leaveCount}
              </p>
            </div>
            <div className="p-6 w-full bg-blue-400 rounded-2xl">
              <p className="text-center text-h4 font-body font-bold">
                Projects: {projectsCount}{' '}
              </p>
            </div>
            <div className="p-6 w-full bg-purple-400 rounded-2xl ">
              <p className="text-center text-h4 text-gray-50 font-body font-bold">
                Roles: {roleCount}
              </p>
            </div>
            <div className="p-6 w-full bg-green-400 rounded-2xl ">
              <p className="text-center text-h4 font-body font-bold">
                Time reports: {timereportsCount}
              </p>
            </div>
          </div>
          <div className="p-6 w-full bg-red-400 rounded-2xl mt-4 desktop:mt-0">
            <p className="text-center text-h4 text-gray-50 font-body font-bold">
              Notices: {noticeCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashBoardPage;
