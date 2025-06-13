import { BookmarkIcon, GridIcon, SearchIcon } from "../icons/NavIcons";

const Navbar = ({ page, setPage }) => {
  return (
    <div className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur border-b border-sky-900">
      <nav className="max-w-7xl mx-auto px-4 flex justify-center gap-2 md:gap-4 pb-2 md:pb-4 pt-2 md:pt-4 shadow-sm">
        <button
          className={`font-semibold px-2 md:px-4 py-1 md:py-2 rounded-t-lg transition-all duration-200 tracking-wide text-sm md:text-lg shadow-sm border-b-4 ${
            page === "categories"
              ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
              : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
          }`}
          onClick={() => setPage("categories")}
        >
          <span className="inline-flex items-center gap-1 md:gap-2 p-1">
            <GridIcon className="w-4 h-4 " />
            <span className="text-xs md:text-base">Catégories</span>
          </span>
        </button>

        <button
          className={`font-semibold px-2 md:px-4 py-1 md:py-2 rounded-t-lg transition-all duration-200 tracking-wide text-sm md:text-lg shadow-sm border-b-4 ${
            page === "search"
              ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
              : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
          }`}
          onClick={() => setPage("search")}
        >
          <span className="inline-flex items-center gap-1 md:gap-2 p-1">
            <SearchIcon className="w-4 h-4" />
            <span className="text-xs md:text-base">Recherche</span>
          </span>
        </button>

        <button
          className={`font-semibold px-2 md:px-4 py-1 md:py-2 rounded-t-lg transition-all duration-200 tracking-wide text-sm md:text-lg shadow-sm border-b-4 ${
            page === "watchlist"
              ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
              : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
          }`}
          onClick={() => setPage("watchlist")}
        >
          <span className="inline-flex items-center gap-1 md:gap-2 p-1">
            <BookmarkIcon className="w-4 h-4" />
            <span className="text-xs md:text-base">Watchlist</span>
          </span>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
