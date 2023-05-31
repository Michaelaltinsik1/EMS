import { Theme } from 'src/Types/enums';
import Icon from '../Base/Icon';
import Input from '../Base/Input';
import { useBreakpoint } from './hooks/useBreakpoint';
interface FilterProps {
  theme: Theme;
}
const Filter = ({ theme }: FilterProps) => {
  const { isDesktop } = useBreakpoint();
  return (
    <div>
      {isDesktop ? (
        <Input
          isErrorSpaceDiv={false}
          type="search"
          name="search"
          label=""
          placeholder="Filter by name"
        />
      ) : (
        <button className="flex items-center justify-center">
          <Icon name="Filter" theme={theme} />
        </button>
      )}
    </div>
  );
};
export default Filter;
