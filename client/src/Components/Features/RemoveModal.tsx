import Modal from './Modal';
import Heading from '../Base/Heading';
import Paragraph from '../Base/Paragrapgh';
import Button from '../Base/Button';
import { Entities } from 'src/Types/enums';
import { deleteDepartmentById } from 'src/API/department';
import { deleteLeaveById } from 'src/API/leave';
import { deleteNotice } from 'src/API/notice';
import { deleteProjectById } from 'src/API/project';
import { deleteRoleById } from 'src/API/role';
import { deleteTimeReport } from 'src/API/timereport';
import { deleteUserById } from 'src/API/user';
import {
  ProjectType,
  UserType,
  RoleType,
  LeaveType,
  Time_reportType,
  DepartmentType,
  NoticeType,
} from 'src/Types';
import { CacheContext } from './Context/CacheProvider';
import { useContext, useState } from 'react';
import { Toast } from 'src/utils/toastGenerator';
import Loader from '../Base/Loader';
import { ThemeContext } from './Context/ThemeProvider';
interface APIResult<T> {
  data?: Array<T>;
  errors?: Array<{ error: string }>;
}
interface RemoveModalProps {
  Entity: Entities;
  handleOnClick: () => void;
  id: string;
  name?: string;
  setIsFormOpen: (newValue: boolean) => void;
}

const RemoveModal = ({
  Entity,
  handleOnClick,
  id,
  name = '',
  setIsFormOpen,
}: RemoveModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    updateProjects,
    updateLeaves,
    updateDepartments,
    updateEmployees,
    updateNotices,
    updateRoles,
    updateTimereports,
  } = useContext(CacheContext);
  const { theme } = useContext(ThemeContext);
  const handleRemove = async () => {
    setIsLoading(true);
    switch (Entity) {
      case Entities.PROJECT: {
        const removedProject: APIResult<ProjectType> = await deleteProjectById(
          id
        );
        if (removedProject?.data) {
          updateProjects(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedProject?.errors) {
          handleErrorToast(removedProject?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      case Entities.EMPLOYEE: {
        const removedEmployee: APIResult<UserType> = await deleteUserById(id);
        if (removedEmployee?.data) {
          updateEmployees(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedEmployee?.errors) {
          handleErrorToast(removedEmployee?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      case Entities.LEAVE: {
        const removedLeave: APIResult<LeaveType> = await deleteLeaveById(id);
        if (removedLeave?.data) {
          updateLeaves(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedLeave?.errors) {
          handleErrorToast(removedLeave?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      case Entities.ROLE: {
        const removedRole: APIResult<RoleType> = await deleteRoleById(id);
        if (removedRole?.data) {
          updateRoles(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedRole?.errors) {
          handleErrorToast(removedRole?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      case Entities.TIMEREPORT: {
        const removedTimereport: APIResult<Time_reportType> =
          await deleteTimeReport(id);
        if (removedTimereport?.data) {
          updateTimereports(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedTimereport?.errors) {
          handleErrorToast(removedTimereport?.errors);
        } else if (removedTimereport?.errors) {
          handleErrorToast(removedTimereport?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      case Entities.DEPARTMENT: {
        const removedDepartment: APIResult<DepartmentType> =
          await deleteDepartmentById(id);
        if (removedDepartment?.data) {
          updateDepartments(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedDepartment?.errors) {
          handleErrorToast(removedDepartment?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      case Entities.NOTICE: {
        const removedNotice: APIResult<NoticeType> = await deleteNotice(id);
        if (removedNotice?.data) {
          updateNotices(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
            theme: theme,
          });
        } else if (removedNotice?.errors) {
          handleErrorToast(removedNotice?.errors);
        }
        setIsLoading(false);
        setIsFormOpen(false);
        return;
      }
      default: {
        return;
      }
    }
  };
  const handleErrorToast = (errors?: Array<{ error: string }>) => {
    if (errors) {
      errors.map((errorMessage) =>
        Toast({
          message: errorMessage.error,
          id: `${Entity}RemoveToastError`,
          isSuccess: false,
          theme: theme,
        })
      );
    } else {
      Toast({
        message: 'Internal server error!',
        id: `${Entity}RemoveToastError`,
        isSuccess: false,
        theme: theme,
      });
    }
  };

  return (
    <Modal handleOnClick={handleOnClick}>
      <Heading
        className="mb-[24px]"
        type="H2"
        content={`Remove ${name ? name : Entity}`}
      />
      <Paragraph
        className="mb-[32px]"
        type="body"
        content={`This ${Entity.toLowerCase()} will be permanetly removed. Are you surtain you want to delete this ${Entity.toLowerCase()}?`}
      />
      <Button
        onClick={handleRemove}
        type="button"
        variant="confirmRemoveButton"
      >
        {!isLoading ? `Remove ${Entity.toLocaleLowerCase()}` : <Loader />}
      </Button>
    </Modal>
  );
};
export default RemoveModal;
