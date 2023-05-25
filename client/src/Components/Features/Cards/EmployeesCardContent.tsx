import { useState } from 'react';
import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { UserType } from 'src/Types';
import Button from 'src/Components/Base/Button';
interface CardProps {
  user: UserType;
  theme: Theme;
  isExpanded: boolean;
}
const EmployeeCardContent = ({ user, theme, isExpanded }: CardProps) => {
  return (
    <>
      <Heading
        className="mb-1"
        type="H3"
        content={`${user.firstName} ${user.lastName}`}
      />
      <Paragraph
        className="mb-2"
        type="bodySmall"
        content={user?.role?.name || ''}
      />
      <Paragraph className="mb-2" type="body" content={user.date_of_birth} />
      <div className="flex items-center">
        <Paragraph
          className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
          type="body"
          content={`Id: ${user.id}`}
        />
        {!isExpanded && (
          <Icon className="ml-auto" name="Expand" theme={theme} />
        )}
      </div>
      {isExpanded && (
        <>
          <Paragraph className="mt-4 mb-1" type="bodySmall" content="Email: " />
          <Paragraph type="body" content={user.email} />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Hire date: "
          />
          <Paragraph
            type="body"
            content={user.created_at.toString().split('T')[0]}
          />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Department: "
          />
          <Paragraph type="bodySmall" content={user?.department?.name || ''} />
          <Paragraph
            className="mt-6 mb-1"
            type="bodySmall"
            content="Salary: "
          />
          <Paragraph type="body" content={user.salary} />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Permission: "
          />
          <Paragraph className="mb-6" type="body" content={user.permission} />
          <Button
            className="mb-4"
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
export default EmployeeCardContent;
