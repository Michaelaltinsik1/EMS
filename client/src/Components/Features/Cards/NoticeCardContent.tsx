import Heading from 'src/Components/Base/Heading';
import Paragraph from 'src/Components/Base/Paragrapgh';
import Icon from 'src/Components/Base/Icon';
import { Theme } from 'src/Types/enums';
import { NoticeType, PermissionType } from 'src/Types';
import Button from 'src/Components/Base/Button';
interface CardProps {
  notice: NoticeType;
  theme: Theme;
  isExpanded: boolean;
  permission: PermissionType;
}
const NoticeCardContent = ({
  notice,
  theme,
  isExpanded,
  permission,
}: CardProps) => {
  console.log(notice);
  return (
    <>
      <Heading
        className="mb-1"
        type="H3"
        content={`${notice.user?.firstName} ${notice.user?.lastName}`}
      />
      <Paragraph
        className="mb-2"
        type="bodySmall"
        content={notice.user?.role?.name || ''}
      />
      <Paragraph
        className="mb-2"
        type="body"
        content={notice.user?.date_of_birth}
      />
      <div className="flex items-center">
        <Paragraph
          className="whitespace-nowrap text-ellipsis overflow-hidden mr-2"
          type="body"
          content={`Id: ${notice.id}`}
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
            content="Created at: "
          />
          <Paragraph
            type="body"
            content={notice.created_at.toString().split('T')[0]}
          />
          <Paragraph
            className="mt-4 mb-1"
            type="bodySmall"
            content="Description: "
          />
          <Paragraph type="body" content={notice.description || ''} />

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
export default NoticeCardContent;
