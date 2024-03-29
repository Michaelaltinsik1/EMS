import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { DepartmentType } from 'src/Types';
import Button from 'src/Components/Base/Button';
import { MouseEvent } from 'react';
interface CardProps {
  department: DepartmentType;
  theme: Theme;
  isExpanded: boolean;
  clickHandler: () => void;
  clickHandlerRemove: () => void;
}
const DepartmentCardContent = ({
  department,
  theme,
  isExpanded,
  clickHandler,
  clickHandlerRemove,
}: CardProps) => {
  let address: string = '';
  if (
    department?.addresses?.zip &&
    department?.addresses?.city &&
    department?.addresses?.country
  ) {
    address = `${department?.addresses?.zip} ${department?.addresses?.city} ${department?.addresses?.country}`;
  }

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
      <Heading className="mb-1" type="H3" content={department.name} />
      <div className="flex items-center">
        <Paragraph
          className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
          type="body"
          content={`Id: ${department.id}`}
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
            content="Budget: "
          />
          <Paragraph type="body" content={department.budget} />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Created at: "
          />
          <Paragraph
            type="body"
            content={department.created_at.toString().split('T')[0]}
          />
          {address && (
            <Paragraph
              className="mt-4 mb-1"
              type="bodySmall"
              content="Adress: "
            />
          )}
          {address && <Paragraph type="bodySmall" content={address} />}
          <Button
            className="mb-4 mt-6"
            onClick={(e) => handleOnClick(e)}
            variant="addButton"
            type="button"
          >
            Edit
          </Button>
          <Button
            className="mb-4"
            onClick={(e) => handleRemoveOnClick(e)}
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
export default DepartmentCardContent;
