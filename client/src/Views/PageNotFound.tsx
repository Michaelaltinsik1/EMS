import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to={'/'}>Navigate back to sign in page</Link>
    </div>
  );
};
export default PageNotFound;
