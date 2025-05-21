# The Movie Watchlist 🎬

A modern web application to discover, search, and organize your favorite movies.

## Features ✨

- **Category Navigation**: Browse movies by genre (Action, Comedy, Drama, etc.)
- **Real-Time Search**: Instantly find the movies you're looking for
- **Watchlist Management**:
  - Add movies to your personal watchlist
  - Rate movies with a star system (1-5)
  - Add personal comments
  - Sort your watchlist by add date, rating, or alphabetically
  - Search within your watchlist
- **Movie Details**:
  - Detailed information about each movie
  - Access to trailers
  - Cast and crew information
  - Release year and duration
  - TMDB average rating

## Technologies Used 🛠

- **React 19**: Modern and reactive user interface
- **Redux Toolkit**: Centralized state management
- **Tailwind CSS**: Elegant and responsive styling
- **Vite**: Fast and modern build tool
- **TMDB API**: Movie data source

## Getting Started 🚀

1. Clone the repository:

```bash
git clone [your-repo-url]
cd movies-watchlist
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with your TMDB API key:

```
API_KEY=your_api_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure 📁

```
src/
├── components/     # Reusable components
├── layouts/        # Layout components
├── pages/         # Page components
├── store/         # Redux configuration and slices
└── features/      # Feature-organized functionality
```

## API 🔧

The application uses the TMDB (The Movie Database) API to fetch:

- Movies by category
- Search results
- Movie details
- Trailers
- Cast and crew information

## Contributing 🤝

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author 👨‍💻

[Your name] - [Your website/GitHub]

## Acknowledgments 🙏

- TMDB for their excellent API
- React community for their amazing tools and resources
- All project contributors
