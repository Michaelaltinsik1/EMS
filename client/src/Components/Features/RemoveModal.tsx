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
import { useContext } from 'react';
import { Toast } from 'src/utils/toastGenerator';

interface APIResult<T> {
  data?: Array<T>;
  errors?: Array<{ error: string }>;
}
interface RemoveModalProps {
  Entity: Entities;
  handleOnClick: () => void;
  id: string;
  name?: string;
}

const RemoveModal = ({
  Entity,
  handleOnClick,
  id,
  name = '',
}: RemoveModalProps) => {
  const {
    updateProjects,
    updateLeaves,
    updateDepartments,
    updateEmployees,
    updateNotices,
    updateRoles,
    updateTimereports,
  } = useContext(CacheContext);
  const handleRemove = async () => {
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
          });
        } else if (removedProject?.errors) {
          handleErrorToast(removedProject?.errors);
        }
        return;
      }
      case Entities.EMPLOYEE: {
        const removedEmployee: APIResult<UserType> = await deleteUserById(id);
        if (removedEmployee?.data) {
          updateEmployees(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
          });
        } else if (removedEmployee?.errors) {
          handleErrorToast(removedEmployee?.errors);
        }
        return;
      }
      case Entities.LEAVE: {
        const removedLeave: APIResult<LeaveType> = await deleteLeaveById(id);
        if (removedLeave?.data) {
          updateLeaves(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
          });
        } else if (removedLeave?.errors) {
          handleErrorToast(removedLeave?.errors);
        }
        return;
      }
      case Entities.ROLE: {
        const removedRole: APIResult<RoleType> = await deleteRoleById(id);
        if (removedRole?.data) {
          updateRoles(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
          });
        } else if (removedRole?.errors) {
          handleErrorToast(removedRole?.errors);
        }
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
          });
        } else if (removedTimereport?.errors) {
          handleErrorToast(removedTimereport?.errors);
        } else if (removedTimereport?.errors) {
          handleErrorToast(removedTimereport?.errors);
        }
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
          });
        } else if (removedDepartment?.errors) {
          handleErrorToast(removedDepartment?.errors);
        }
        return;
      }
      case Entities.NOTICE: {
        const removedNotice: APIResult<NoticeType> = await deleteNotice(id);
        if (removedNotice?.data) {
          updateNotices(null);
          Toast({
            message: `${Entity} has been removed`,
            id: `${Entity}RemoveToastSuccess`,
          });
        } else if (removedNotice?.errors) {
          handleErrorToast(removedNotice?.errors);
        }
        return;
      }
      default: {
        return;
      }
    }
  };
  const handleErrorToast = (errors?: Array<{ error: string }>) => {
    if (errors) {
      console.log(errors);
      errors.map((errorMessage) =>
        Toast({
          message: errorMessage.error,
          id: `${Entity}RemoveToastError`,
          isSuccess: false,
        })
      );
    } else {
      Toast({
        message: 'Internal server error!',
        id: `${Entity}RemoveToastError`,
        isSuccess: false,
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
        Remove {Entity.toLocaleLowerCase()}
      </Button>
    </Modal>
  );
};
export default RemoveModal;
