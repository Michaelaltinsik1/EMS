import { body, body2 } from 'src/utils/typography';
import { useContext } from 'react';
import { ThemeContext } from '../Features/ThemeProvider';
export enum Theme {
  LIGHT = 'light',
  Dark = 'dark',
}

interface ParagraphProps {
  type: 'body' | 'bodySmall';
  content: string | number;
  isLightTheme?: boolean;
}

const Paragraph = ({ type, content, isLightTheme = true }: ParagraphProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {type === 'body' ? (
        <p
          className={`${body} ${
            theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
          }`}
        >
          {content}
        </p>
      ) : (
        <p
          className={`${body2} ${
            theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-50'
          }`}
        >
          {content}
        </p>
      )}
    </>
  );
};
export default Paragraph;
