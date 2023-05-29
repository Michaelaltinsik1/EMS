import { Theme } from 'src/Types/enums';
import { ProjectType } from 'src/Types';
import TableItem from 'src/Components/Base/TableItem';
import { useBreakpoint } from '../../hooks/useBreakpoint';
interface rowProps {
  project: ProjectType;
  theme?: Theme;
}
const ProjectRow = ({ project, theme }: rowProps) => {
  const { isTablet } = useBreakpoint();
  return (
    <>
      <tr
        className={`[&>td]:py-4 border-b border-opacity-50 rounded-lg last-of-type:border-none cursor-pointer ${
          theme === Theme.LIGHT
            ? 'border-gray-900 hover:bg-gray-300 active:bg-gray-400'
            : 'border-gray-100 hover:bg-gray-800 active:bg-gray-900'
        }`}
      >
        <TableItem type="tableData">{project.name}</TableItem>
        {!isTablet && <TableItem type="tableData">{project.id}</TableItem>}
        <TableItem type="tableData">
          {project.created_at.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">
          {project.deadline.toString().split('T')[0]}
        </TableItem>
        <TableItem type="tableData">{project.description || ''}</TableItem>
      </tr>
    </>
  );
};
export default ProjectRow;
