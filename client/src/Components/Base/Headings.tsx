import { H1, H2, H3, H4, H5 } from 'src/utils/typography';

interface HeadingProps {
  type: 'H1' | 'H2' | 'H3' | 'H4' | 'H5';
  content: string | number;
}

const Heading = ({ type, content }: HeadingProps) => {
  const getheadingType = ({ type, content }: HeadingProps) => {
    switch (type) {
      case 'H1':
        return <h1 className={H1}>{content}</h1>;
      case 'H2':
        return <h2 className={H2}>{content}</h2>;
      case 'H3':
        return <h3 className={H3}>{content}</h3>;
      case 'H4':
        return <h4 className={H4}>{content}</h4>;
      case 'H5':
        return <h5 className={H5}>{content}</h5>;
    }
  };
  return getheadingType({ type, content });
};
export default Heading;
