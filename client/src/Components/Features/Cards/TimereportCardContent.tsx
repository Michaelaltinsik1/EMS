import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { PermissionType, Time_reportType } from 'src/Types';
import Button from 'src/Components/Base/Button';
import { MouseEvent } from 'react';
import { getTimereportDateTime } from 'src/utils/functions';
interface CardProps {
  timereport: Time_reportType;
  theme: Theme;
  isExpanded: boolean;
  permission: PermissionType;
  clickHandler: () => void;
  clickHandlerRemove: () => void;
}
const TimereportCardContent = ({
  timereport,
  theme,
  isExpanded,
  permission,
  clickHandler,
  clickHandlerRemove,
}: CardProps) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clickHandler();
  };
  const handleRemoveOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clickHandlerRemove();
  };
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
            content={getTimereportDateTime(timereport.created_at.toString())}
          />
          <Paragraph className="mt-4 mb-1" type="bodySmall" content="From: " />
          <Paragraph
            type="body"
            content={getTimereportDateTime(timereport.from.toString())}
          />
          <Paragraph className="mt-4 mb-1" type="bodySmall" content="To: " />
          <Paragraph
            type="body"
            content={getTimereportDateTime(timereport.to.toString())}
          />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Status: "
          />
          <Paragraph type="body" content={timereport.status} />

          {permission === 'ADMIN' && (
            <Button
              className="mb-4 mt-6"
              onClick={(e) => handleOnClick(e)}
              variant="addButton"
              type="button"
            >
              Edit
            </Button>
          )}
          {permission === 'ADMIN' && (
            <Button
              className="mb-4"
              onClick={(e) => handleRemoveOnClick(e)}
              variant="removeButton"
              type="button"
            >
              Remove
            </Button>
          )}
          {isExpanded && (
            <Icon className="ml-auto" name="Minimize" theme={theme} />
          )}
        </>
      )}
    </>
  );
};
export default TimereportCardContent;
