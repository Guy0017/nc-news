import { useState, useEffect } from "react";

const Pagination = ({ page, setPage, articles }) => {
  const [disableNext, setDisableNext] = useState(false);

  const load = () => {
    const maxPage = articles[0]
      ? Math.ceil(articles[0].total_count / 10) * 10
      : 0;

    page * 10 >= maxPage ? setDisableNext(true) : setDisableNext(false);
  };

  const loadPage = (change) => {
    setPage(page + change);
  };

  useEffect(() => {
    load();
  }, [page]);

  return (
    <>
      {page > 1 ? (
        <button
          className="pagination--button"
          onClick={() => {
            loadPage(-1);
          }}
        >
          Prev
        </button>
      ) : null}
      <button
        className="pagination--button"
        disabled={disableNext}
        onClick={() => {
          loadPage(1);
        }}
      >
        Next
      </button>
      <p className="pagination--page">Page: {page}</p>
    </>
  );
};

export default Pagination;
