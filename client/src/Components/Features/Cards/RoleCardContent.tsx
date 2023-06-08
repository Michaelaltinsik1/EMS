import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';

import { Theme } from 'src/Types/enums';
import { RoleType } from 'src/Types';
import Button from 'src/Components/Base/Button';
import { MouseEvent } from 'react';
interface CardProps {
  role: RoleType;
  theme: Theme;
  isExpanded: boolean;
  clickHandler: () => void;
  clickHandlerRemove: () => void;
}
const RoleCardContent = ({
  role,
  theme,
  isExpanded,
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
      <Heading className="mb-1" type="H3" content={role.name} />

      <Paragraph
        className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
        type="body"
        content={`Id: ${role.id}`}
      />
      <Paragraph
        className="mt-4 mb-1"
        type="bodySmall"
        content="Created at: "
      />
      <Paragraph
        type="body"
        content={role.created_at.toString().split('T')[0]}
      />
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
    </>
  );
};
export default RoleCardContent;
