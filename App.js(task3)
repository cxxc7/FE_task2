//src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [voteAverages, setVoteAverages] = useState({});

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/http://5.254.6.120:5000/api/v1/nsup/NowShowing')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        const initialVotes = data.reduce((acc, movie) => {
          acc[movie._id] = movie.vote_average; // Use _id here
          return acc;
        }, {});
        setVoteAverages(initialVotes);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const updateVoteAverage = (id, change) => {
    setVoteAverages(prev => {
      const currentVote = prev[id] || 0;
      // Calculate new vote, ensuring it's within the range of 0 to 10
      const newVote = Math.min(10, Math.max(0, (currentVote + change).toFixed(1)));
      return {
        ...prev,
        [id]: newVote
      };
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MovieList movies={movies} vote_average={voteAverages} />} />
        <Route path="/movie/:id" element={<MovieDetails movies={movies} vote_average={voteAverages} updateVoteAverage={updateVoteAverage} />} />
      </Routes>
    </div>
  );
}

export default App;
