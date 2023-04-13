import { deleteCommentByCommentID, deleteArticleById } from "../Api";

const Delete = ({ type, id, arrayList, setArrayList, setError }) => {
  const handleDelete = () => {
    const typeModifier = type.concat("_id");
    const errorMsgModifier = type[0].toUpperCase().concat(type.slice(1));
    const deleteItem = arrayList.filter((item) => item[typeModifier] === id);

    setError(false);

    setArrayList((currArray) => {
      const optimisticRender = [...currArray].filter((item) => {
        return item[typeModifier] !== id;
      });
      return optimisticRender;
    });

    const deleteItemById =
      type === "article" ? deleteArticleById : deleteCommentByCommentID;

    deleteItemById(id).catch((error) => {
      console.log(error);
      setArrayList((currArray) => {
        const undoOptimisticRender = [deleteItem[0], ...currArray];

        return undoOptimisticRender;
      });

      setError({
        status: 400,
        msg: `Error Deleting ${errorMsgModifier}. Please Delete ${errorMsgModifier} Again...`,
      });
    });
  };

  return (
    <button className="deleteButton" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default Delete;
