import Heading from 'src/Components/Base/Heading';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import { getSingleUserCountsById } from 'src/API/user';

import Paragraph from 'src/Components/Base/Paragrapgh';
interface SingleUserCountResponse {
  data: {
    projectCount: number;
    timereportCount: number;
  };
}
const DashBoardPage = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [timereportsCount, setTimereportsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    const getProjectsCount = async () => {
      setIsLoading(true);
      const singleUserCounts: SingleUserCountResponse =
        await getSingleUserCountsById(userId);
      if (singleUserCounts?.data) {
        setProjectsCount(singleUserCounts.data.projectCount);
        setTimereportsCount(singleUserCounts.data.timereportCount);
      }
      setIsLoading(false);
    };

    getProjectsCount();
    //}
  }, [userId]);
  return (
    <>
      <div className="p-4 desktop:py-[64px]">
        <div className="max-w-[800px] mx-auto">
          <div className="grid desktop:grid-cols-2 desktop:[&>div]:aspect-square desktop:[&>div]:w-full gap-4 desktop:gap-x-20  desktop:gap-y-0 desktop:[&>div]:mb-10 desktop:[&>div]:flex desktop:[&>div]:justify-center desktop:[&>div]:items-center ">
            <Heading
              className="desktop:mb-6 desktop:col-span-2"
              type="H2"
              content={`Welcome, ${capitalizeFirstLetter(
                user?.firstName || ''
              )} ${capitalizeFirstLetter(user?.lastName || '')}!`}
            />
            <Paragraph
              className="mb-2 desktop:col-span-2 desktop:mb-[32px]"
              type="body"
              content="Here is an overview of some key data."
            />
            <div className="p-6 w-full bg-blue-400 rounded-2xl">
              <p className="text-center text-h4 font-body font-bold">
                Projects: {isLoading ? 'Loading...' : projectsCount}{' '}
              </p>
            </div>
            <div className="p-6 w-full bg-green-400 rounded-2xl">
              <p className="text-center text-h4 font-body font-bold">
                Time reports: {isLoading ? 'Loading...' : timereportsCount}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardPage;
