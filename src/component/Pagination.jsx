import { useEffect } from "react";

const Pagination = ({
  page,
  setPage,
  articles,
  disableNext,
  setDisableNext,
}) => {
  const loadNextPage = () => {
    // if (page * 10 + 10 > articles[0].total_count) {
    //   setDisableNext(true);
    // } 

    setPage(page + 1);
  };

  const loadPrevPage = () => {
    // setDisableNext(false);

    setPage(page - 1);
  };

  useEffect(() => {    

    const maxPage = Math.ceil(articles[0].total_count / 10) * 10
    
    page * 10 >= maxPage ? setDisableNext(true) :  setDisableNext(false)

}, [page])

  return (
    <>
      {page > 1 ? (
        <button className="pagination--button" onClick={loadPrevPage}>
          Prev
        </button>
      ) : null}
      <button
        className="pagination--button"
        disabled={disableNext}
        onClick={loadNextPage}
      >
        Next
      </button>
      <p className="pagination--page">Page: {page}</p>
    </>
  );
};

export default Pagination;
