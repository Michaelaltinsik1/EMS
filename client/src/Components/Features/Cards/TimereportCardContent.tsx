import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { PermissionType, Time_reportType } from 'src/Types';
import Button from 'src/Components/Base/Button';
interface CardProps {
  timereport: Time_reportType;
  theme: Theme;
  isExpanded: boolean;
  permission: PermissionType;
}
const TimereportCardContent = ({
  timereport,
  theme,
  isExpanded,
  permission,
}: CardProps) => {
  return (
    <>
      <Heading
        className="mb-1"
        type="H3"
        content={`${timereport.user?.firstName} ${timereport.user?.lastName}`}
      />
      <Paragraph
        className="mb-2"
        type="bodySmall"
        content={timereport.user?.role?.name || ''}
      />
      <Paragraph
        className="mb-2"
        type="body"
        content={timereport?.user?.date_of_birth}
      />
      <div className="flex items-center">
        <Paragraph
          className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
          type="body"
          content={`Id: ${timereport.id}`}
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
            content="Project: "
          />
          <Paragraph type="body" content={timereport.user?.projects[0]?.name} />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Created at: "
          />
          <Paragraph
            type="body"
            content={timereport.created_at.toString().split('T')[0]}
          />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Status: "
          />
          <Paragraph type="body" content={timereport.status} />

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
export default TimereportCardContent;
