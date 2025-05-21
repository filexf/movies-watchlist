import { useState } from "react";
import { AddIcon, RemoveIcon } from "./icons/ActionIcons";

const AddToWatchlistButton = ({ movie, onAdd }) => {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (!added) {
      setAdded(true);
      onAdd(movie);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
        added
          ? "bg-green-600/20 text-green-400 cursor-default"
          : "bg-sky-600 text-white hover:bg-sky-700"
      }`}
    >
      {added ? (
        <>
          <RemoveIcon className="w-4 h-4" />
          Ajouté
        </>
      ) : (
        <>
          <AddIcon className="w-4 h-4" />
          Ajouter
        </>
      )}
    </button>
  );
};

export default AddToWatchlistButton;
