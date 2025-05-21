import { useSelector } from "react-redux";
import { CheckIcon } from "./icons/ActionIcons";

function SavedNotification() {
  const showSaved = useSelector((state) => state.watchlist.showSaved);

  return (
    <div
      className={`z-50 fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
        showSaved
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <CheckIcon className="w-5 h-5" />
      Film ajouté à votre watchlist
    </div>
  );
}

export default SavedNotification;
