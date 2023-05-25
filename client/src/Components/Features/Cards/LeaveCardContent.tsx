import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { LeaveType, PermissionType } from 'src/Types';
import Button from 'src/Components/Base/Button';
interface CardProps {
  leave: LeaveType;
  theme: Theme;
  isExpanded: boolean;
  permission: PermissionType;
}
const LeaveCardContent = ({
  leave,
  theme,
  isExpanded,
  permission,
}: CardProps) => {
  return (
    <>
      <Heading
        className="mb-1"
        type="H3"
        content={`${leave.user?.firstName} ${leave.user?.lastName}`}
      />
      <Paragraph
        className="mb-2"
        type="bodySmall"
        content={leave.user?.role?.name || ''}
      />
      <Paragraph
        className="mb-2"
        type="body"
        content={leave.user?.date_of_birth}
      />
      <div className="flex items-center">
        <Paragraph
          className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
          type="body"
          content={`Id: ${leave.id}`}
        />
        {!isExpanded && (
          <Icon className="ml-auto" name="Expand" theme={theme} />
        )}
      </div>
      {isExpanded && (
        <>
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Type of leave: "
          />
          <Paragraph type="body" content={leave.type_of_leave} />
          <Paragraph className="mt-4 mb-1" type="bodySmall" content="From: " />
          <Paragraph
            type="body"
            content={leave.from.toString().split('T')[0]}
          />
          <Paragraph className="mt-4 mb-1" type="bodySmall" content="To: " />
          <Paragraph type="body" content={leave.to.toString().split('T')[0]} />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Status: "
          />
          <Paragraph type="body" content={leave.status} />
          <Button
            className="mb-4 mt-6"
            onClick={(e) => e.stopPropagation()}
            variant="addButton"
            type="button"
          >
            Edit
          </Button>
          <Button
            className="mb-4"
            onClick={(e) => e.stopPropagation()}
            variant="removeButton"
            type="button"
          >
            Remove
          </Button>
          {isExpanded && (
            <Icon className="ml-auto" name="Minimize" theme={theme} />
          )}
        </>
      )}
    </>
  );
};
export default LeaveCardContent;
