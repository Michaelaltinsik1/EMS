import { body, body2 } from 'src/utils/typography';

interface ParagraphProps {
  type: 'body' | 'bodySmall';
  content: string | number;
}

const Paragraph = ({ type, content }: ParagraphProps) => {
  return (
    <>
      {type === 'body' ? (
        <p className={body}>{content}</p>
      ) : (
        <p className={body2}>{content}</p>
      )}
    </>
  );
};
export default Paragraph;
