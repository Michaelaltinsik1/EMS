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
import ChangeAddressForm from 'src/Components/Features/Forms/ChangeAddressForm';
import { CacheContext } from 'src/Components/Features/Context/CacheProvider';

interface UserAPI {
  data?: UserType;
  errors?: Array<{ error: string }>;
}
const ManageAccountPage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { employee, updateEmployee } = useContext(CacheContext);
  const userId = user?.userId as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [userData, setUserData] = useState<UserType | null>(null);

  const [isUpdatePasswordFormVisible, setIsUpdatePasswordFormVisible] =
    useState<boolean>(false);
  const [isUpdateAddressFormVisible, setIsUpdateAddressFormVisible] =
    useState<boolean>(false);
  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const userResponse: UserAPI = await getUserById(userId);
      if (userResponse?.data) {
        updateEmployee(userResponse.data);
      }
      setIsLoading(false);
    };
    if (employee === null) {
      getUserData();
    }
  }, [employee, userId, updateEmployee]);

  const showAddressForm = () => {
    setIsUpdateAddressFormVisible(true);
  };
  const hideAddressForm = () => {
    setIsUpdateAddressFormVisible(false);
  };
  return (
    <>
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
              <Paragraph
                type="bodySmall"
                content="Email"
                className="font-thin"
              />
              {isLoading ? (
                <Paragraph type="body" content="Loading..." />
              ) : (
                <Paragraph
                  type="body"
                  content={employee ? employee.email : ''}
                />
              )}
            </div>
            <div>
              <Paragraph
                type="bodySmall"
                content="Role"
                className="font-thin"
              />
              {isLoading ? (
                <Paragraph type="body" content="Loading..." />
              ) : (
                <Paragraph
                  type="body"
                  content={employee?.role?.name ? employee.role?.name : ''}
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
                  content={employee?.salary ? employee.salary : ''}
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
                    employee?.department?.name ? employee.department?.name : ''
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
                  employee?.addresses && employee.addresses.length > 0
                    ? employee.addresses[0]?.street
                    : ''
                },
                ${
                  employee?.addresses && employee.addresses.length > 0
                    ? employee.addresses[0]?.zip
                    : ''
                }
                ${
                  employee?.addresses && employee.addresses.length > 0
                    ? employee.addresses[0]?.city
                    : ''
                }
                (${
                  employee?.addresses && employee.addresses.length > 0
                    ? employee.addresses[0]?.country
                    : ''
                })`}
                  />
                )}
              </div>
              <Button
                onClick={showAddressForm}
                type="button"
                variant="addButton"
              >
                Update address
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isUpdateAddressFormVisible && (
        <ChangeAddressForm
          city={
            employee &&
            employee.addresses &&
            employee.addresses.length > 0 &&
            employee.addresses[0].city
              ? employee.addresses[0].city
              : ''
          }
          street={
            employee &&
            employee.addresses &&
            employee.addresses.length > 0 &&
            employee.addresses[0].street
              ? employee.addresses[0].street
              : ''
          }
          zip={
            employee &&
            employee.addresses &&
            employee.addresses.length > 0 &&
            employee.addresses[0].zip
              ? employee.addresses[0].zip
              : ''
          }
          country={
            employee &&
            employee.addresses &&
            employee.addresses.length > 0 &&
            employee.addresses[0].country
              ? employee.addresses[0].country
              : ''
          }
          id={
            employee &&
            employee.addresses &&
            employee.addresses.length > 0 &&
            employee.addresses[0].id
              ? employee.addresses[0].id
              : ''
          }
          closeForm={hideAddressForm}
          handleOnClick={hideAddressForm}
        />
      )}
    </>
  );
};
export default ManageAccountPage;
