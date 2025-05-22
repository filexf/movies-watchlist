const Navbar = ({ page, setPage }) => {
  return (
    <nav className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur border-b border-sky-900 flex justify-center gap-8 mb-8 pb-4 pt-4 shadow-sm">
      <button
        className={`font-semibold px-6 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
          page === "search"
            ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
            : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
        }`}
        onClick={() => setPage("search")}
      >
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
          Recherche de films
        </span>
      </button>
      <button
        className={`font-semibold px-6 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
          page === "watchlist"
            ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
            : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
        }`}
        onClick={() => setPage("watchlist")}
      >
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 6h14M5 12h14M5 18h14"
            />
          </svg>
          Ma Watchlist
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
