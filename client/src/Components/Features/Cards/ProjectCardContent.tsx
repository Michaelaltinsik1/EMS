import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { PermissionType, ProjectType } from 'src/Types';
import Button from 'src/Components/Base/Button';
import { MouseEvent } from 'react';
interface CardProps {
  project: ProjectType;
  theme: Theme;
  isExpanded: boolean;
  permission: PermissionType;
  clickHandler: () => void;
  clickHandlerRemove: () => void;
}
const ProjectCardContent = ({
  project,
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
      <Heading className="mb-1" type="H3" content={project.name} />

      <div className="flex items-center">
        <Paragraph
          className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
          type="body"
          content={`Id: ${project.id}`}
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
            content="Start date: "
          />
          <Paragraph
            type="body"
            content={project.created_at.toString().split('T')[0]}
          />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Deadline: "
          />
          <Paragraph
            type="body"
            content={project.deadline.toString().split('T')[0]}
          />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Description: "
          />
          <Paragraph type="body" content={project.description || ''} />
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
export default ProjectCardContent;
