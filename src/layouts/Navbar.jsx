import { BookmarkIcon, GridIcon, SearchIcon } from "../icons/NavIcons";

const Navbar = ({ page, setPage }) => {
  return (
    <nav className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur border-b border-sky-900 flex justify-center gap-4 mb-8 pb-4 pt-4 shadow-sm">
      <button
        className={`font-semibold px-4 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
          page === "categories"
            ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
            : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
        }`}
        onClick={() => setPage("categories")}
      >
        <span className="inline-flex items-center gap-2">
          <GridIcon />
          Catégories
        </span>
      </button>

      <button
        className={`font-semibold px-4 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
          page === "search"
            ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
            : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
        }`}
        onClick={() => setPage("search")}
      >
        <span className="inline-flex items-center gap-2">
          <SearchIcon />
          Recherche
        </span>
      </button>

      <button
        className={`font-semibold px-4 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
          page === "watchlist"
            ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
            : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
        }`}
        onClick={() => setPage("watchlist")}
      >
        <span className="inline-flex items-center gap-2">
          <BookmarkIcon />
          Watchlist
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
