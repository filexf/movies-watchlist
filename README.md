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

- **Next.js 15**: Modern React framework with server-side rendering
- **TypeScript**: Type-safe development
- **React 19**: Modern and reactive user interface
- **Redux Toolkit**: Centralized state management
- **Tailwind CSS**: Elegant and responsive styling
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

3. Create a `.env.local` file in the project root with your TMDB API key:

```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production 🏗

```bash
npm run build
npm start
```

## Project Structure 📁

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── providers.tsx  # Redux provider
├── components/        # Reusable components
├── layouts/          # Layout components
├── pages/            # Page components
├── store/            # Redux configuration and slices
└── icons/            # Icon components
```

## API 🔧

The application uses the TMDB (The Movie Database) API to fetch:

- Movies by category
- Search results
- Movie details
- Trailers
- Cast and crew information

Get your API key from [https://www.themoviedb.org/](https://www.themoviedb.org/)

## TypeScript 🎯

This project is fully typed with TypeScript for better developer experience and code safety.

## Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Acknowledgments 🙏

- TMDB for their API
- Next.js and React communities for their amazing tools and resources
- All project contributors
