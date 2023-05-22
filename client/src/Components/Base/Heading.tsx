import { H1, H2, H3, H4, H5 } from 'src/utils/typography';
import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';

export enum Theme {
  LIGHT = 'light',
  Dark = 'dark',
}

interface HeadingProps {
  type: 'H1' | 'H2' | 'H3' | 'H4' | 'H5';
  content: string | number;
  isLightTheme?: boolean;
}

const Heading = ({ type, content, isLightTheme = true }: HeadingProps) => {
  const { theme } = useContext(ThemeContext);
  const getheadingType = ({ type, content }: HeadingProps) => {
    switch (type) {
      case 'H1':
        return (
          <h1
            className={`${H1} ${
              theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
            }`}
          >
            {content}
          </h1>
        );
      case 'H2':
        return (
          <h2
            className={`${H2} ${
              theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
            }`}
          >
            {content}
          </h2>
        );
      case 'H3':
        return (
          <h3
            className={`${H3} ${
              theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
            }`}
          >
            {content}
          </h3>
        );
      case 'H4':
        return (
          <h4
            className={`${H4} ${
              theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
            }`}
          >
            {content}
          </h4>
        );
      case 'H5':
        return (
          <h5
            className={`${H5} ${
              theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
            }`}
          >
            {content}
          </h5>
        );
    }
  };
  return getheadingType({ type, content });
};
export default Heading;
