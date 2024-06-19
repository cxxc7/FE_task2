import React, { useEffect, useState } from 'react';
import './App.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [sortedMovies, setSortedMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const API_URL = 'http://5.254.6.120:7000/api/v1/nsup/NowShowing';

        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                return response.json();
            })
            .then(data => {
                setMovies(data);
                setSortedMovies(data); // Initially set to unsorted data
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to fetch movies. Please try again later.');
            });
    }, []);

    const sortMovies = (order) => {
        const sorted = [...movies].sort((a, b) => {
            return order === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
        });
        setSortedMovies(sorted);
        setCurrentIndex(0); // Reset index when sorting
    };

    const nextMovies = () => {
        if (currentIndex + 5 < sortedMovies.length) {
            setCurrentIndex(currentIndex + 5);
        }
    };

    const prevMovies = () => {
        if (currentIndex - 5 >= 0) {
            setCurrentIndex(currentIndex - 5);
        }
    };

    const roundVoteAverage = (vote_average) => {
        if (typeof vote_average !== 'undefined' && vote_average !== null) {
            return vote_average.toFixed(1);
        }
        return 'N/A';
    };

    return (
        <div className="app" style={{ backgroundColor: 'black' }}>
            <h1>In Theatres</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="controls">
                <button onClick={() => sortMovies('asc')}>Sort by rating Ascending</button>
                <button onClick={() => sortMovies('desc')}>Sort by rating Descending</button>
            </div>
            <div className="movie-section">
                <div className="arrow left-arrow" onClick={prevMovies}><FaChevronLeft /></div>
                <div id="movieContainer" className="movie-container">
                    {sortedMovies.slice(currentIndex, currentIndex + 5).map((movie) => (
                        <div className="movie" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                            <p>{roundVoteAverage(movie.vote_average)}/10</p>
                        </div>
                    ))}
                </div>
                <div className="arrow right-arrow" onClick={nextMovies}><FaChevronRight /></div>
            </div>
        </div>
    );
}

export default App;
