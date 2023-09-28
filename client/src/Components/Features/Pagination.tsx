import { useContext } from 'react';
import Button from '../Base/Button';
import { ThemeContext } from './Context/ThemeProvider';
import { Theme } from 'src/Types/enums';

interface PaginationType {
  currPage: number;
  totalPages: number;
  setCurrPage: (newValue: number) => void;
}

const Pagination = ({ currPage, totalPages, setCurrPage }: PaginationType) => {
  const { theme } = useContext(ThemeContext);
  const changePage = (newPage: number) => {
    setCurrPage(newPage);
  };
  // ${
  //   theme === Theme.LIGHT ? 'text-gray-900' : 'text-gray-100'
  // }
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    if (totalPages > 1) {
      return (
        <div
          className={`flex rounded mt-auto ${
            theme === Theme.LIGHT
              ? 'bg-gray-100 border solid gray-900'
              : 'bg-gray-700 text-gray-50 border solid gray-100  '
          } max-w-fit mx-auto`}
        >
          <Button
            className={`w-fit ${
              theme === Theme.LIGHT
                ? 'hover:bg-gray-400 active:bg-gray-500'
                : 'hover:bg-gray-800 active:bg-gray-900'
            } rounded disabled:opacity-50`}
            type="button"
            variant="pagination"
            onClick={() => changePage(currPage - 1)}
            disabled={currPage <= 1}
          >
            Prev
          </Button>
          {pages.map((page, index) => (
            <Button
              type="button"
              variant="pagination"
              onClick={() => changePage(index + 1)}
              className={`w-fit ${
                theme === Theme.LIGHT
                  ? 'hover:bg-gray-400 active:bg-gray-500'
                  : 'hover:bg-gray-800 active:bg-gray-900'
              } ${
                currPage === index + 1 &&
                ` ${
                  theme === Theme.LIGHT
                    ? 'bg-gray-800 text-gray-50'
                    : 'bg-gray-300 text-gray-900'
                } pointer-events-none`
              }`}
              key={page}
            >
              {page}
            </Button>
          ))}
          <Button
            type="button"
            variant="pagination"
            className={`w-fit ${
              theme === Theme.LIGHT
                ? 'hover:bg-gray-400 active:bg-gray-500'
                : 'hover:bg-gray-800 active:bg-gray-900'
            } rounded disabled:opacity-50`}
            disabled={currPage === totalPages}
            onClick={() => changePage(currPage + 1)}
          >
            Next
          </Button>
        </div>
      );
    }
  };
  return <>{renderPagination()}</>;
};

export default Pagination;
