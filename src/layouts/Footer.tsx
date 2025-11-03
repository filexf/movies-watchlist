const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="z-30 mt-12 py-12 border-t border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-sky-400 font-semibold mb-3">À propos</h3>
            <p className="text-sm text-gray-400">
              The Movie Watchlist vous permet de découvrir, rechercher et organiser vos films
              préférés. Créez votre liste personnalisée et notez vos films.
            </p>
          </div>

          <div>
            <h3 className="text-sky-400 font-semibold mb-3">Fonctionnalités</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-sky-500">✓</span> Recherche en temps réel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-500">✓</span> Catégories de films
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-500">✓</span> Liste de films personnalisée
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-500">✓</span> Système de notation
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sky-400 font-semibold mb-3">Informations</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>
                Propulsé par{' '}
                <a
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  TMDB
                </a>
              </li>
              <li>Version 1.0.0</li>
              <li>© {currentYear} The Movie Watchlist</li>
              <li>
                <a
                  href="https://github.com/votrerepo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Code source
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
