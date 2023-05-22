import { body, body2 } from 'src/utils/typography';

interface ParagraphProps {
  type: 'body' | 'bodySmall';
  content: string | number;
  isLightTheme?: boolean;
}

const Paragraph = ({ type, content, isLightTheme = true }: ParagraphProps) => {
  return (
    <>
      {type === 'body' ? (
        <p
          className={`${body} ${
            isLightTheme ? 'text-gray-900' : 'text-gray-50'
          }`}
        >
          {content}
        </p>
      ) : (
        <p
          className={`${body2} ${
            isLightTheme ? 'text-gray-900' : 'text-gray-50'
          }`}
        >
          {content}
        </p>
      )}
    </>
  );
};
export default Paragraph;
