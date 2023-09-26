import Heading from 'src/Components/Base/Heading';
import { useContext, useState } from 'react';
import { ThemeContext } from 'src/Components/Features/Context/ThemeProvider';
import { Theme } from 'src/Types/enums';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Button from 'src/Components/Base/Button';
import { useEffect } from 'react';
import { AuthContext } from 'src/Components/Features/Context/AuthProvider';
import { getUserById } from 'src/API/user';
import { UserType } from 'src/Types';

interface UserAPI {
  data?: UserType;
  errors?: Array<{ error: string }>;
}
const ManageAccountPage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const userId = user?.userId as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const userResponse: UserAPI = await getUserById(userId);
      if (userResponse?.data) {
        setUserData(userResponse.data);
      }
      setIsLoading(false);
    };
    getUserData();
  }, [userId]);
  return (
    <div className="p-4 tablet:p-[40px] desktop:py-[64px] desktop:px-[40px]">
      <div
        className={`max-w-[1280px] mx-auto rounded-lg desktop:rounded-3xl flex flex-col tablet:px-[64px] tablet:py-[40px] px-4 py-6 ${
          theme === Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-800'
        }`}
      >
        <Heading
          className="mb-4 desktop:mb-6 "
          type="H2"
          content="Manage account"
        />
        <div className="[&>div:not(:last-child)]:mb-4 [&>div>button]:mt-4 desktop:[&>div>button]:mt-0 [&>div>p]:mt-1 grid desktop:grid-cols-2 desktop:gap-4">
          <div>
            <Paragraph type="bodySmall" content="Email" className="font-thin" />
            {isLoading ? (
              <Paragraph type="body" content="Loading..." />
            ) : (
              <Paragraph
                type="body"
                content={userData?.email ? userData.email : ''}
              />
            )}
          </div>
          <div>
            <Paragraph type="bodySmall" content="Role" className="font-thin" />
            {isLoading ? (
              <Paragraph type="body" content="Loading..." />
            ) : (
              <Paragraph
                type="body"
                content={userData?.role?.name ? userData.role?.name : ''}
              />
            )}
          </div>
          <div>
            <Paragraph
              type="bodySmall"
              content="Yearly salary (Sek)"
              className="font-thin"
            />
            {isLoading ? (
              <Paragraph type="body" content="Loading..." />
            ) : (
              <Paragraph
                type="body"
                content={userData?.salary ? userData.salary : ''}
              />
            )}
          </div>
          <div className="desktop:flex justify-between">
            <div>
              <Paragraph
                type="bodySmall"
                content="Password"
                className="font-thin"
              />
              {isLoading ? (
                <Paragraph type="body" content="Loading..." />
              ) : (
                <Paragraph type="body" content="******************" />
              )}
            </div>
            <Button type="button" variant="addButton">
              Update password
            </Button>
          </div>
          <div>
            <Paragraph
              type="bodySmall"
              content="Department"
              className="font-thin"
            />
            {isLoading ? (
              <Paragraph type="body" content="Loading..." />
            ) : (
              <Paragraph
                type="body"
                content={
                  userData?.department?.name ? userData.department?.name : ''
                }
              />
            )}
          </div>
          <div className="desktop:flex justify-between">
            <div>
              <Paragraph
                type="bodySmall"
                content="Address"
                className="font-thin"
              />
              {isLoading ? (
                <Paragraph type="body" content="Loading..." />
              ) : (
                <Paragraph
                  type="body"
                  content={`
                ${
                  userData?.addresses && userData.addresses.length > 0
                    ? userData.addresses[0]?.street
                    : ''
                },
                ${
                  userData?.addresses && userData.addresses.length > 0
                    ? userData.addresses[0]?.zip
                    : ''
                }
                ${
                  userData?.addresses && userData.addresses.length > 0
                    ? userData.addresses[0]?.city
                    : ''
                }
                (${
                  userData?.addresses && userData.addresses.length > 0
                    ? userData.addresses[0]?.country
                    : ''
                })`}
                />
              )}
            </div>
            <Button type="button" variant="addButton">
              Update address
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageAccountPage;
