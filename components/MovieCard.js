import { useState } from 'react';

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const closeModal = () => {
    setShowModal(false);
    setTrailerKey('');
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const openModal = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=dfd426c27ceb6d9813e4e845a429b3b6`);
      const data = await response.json();
      const trailer = data.results.find(video => video.type === 'Trailer');
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowModal(true);
      } else {
        console.error('Trailer not found for this movie.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  return (
    <>
      <div className="overflow-hidden shadow-lg cursor-pointer">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <div className="pt-4 pb-4 pl-2">
          <h2 className="font-bold text-lg">{movie.title}</h2>
        </div>
      </div>
    </>
  );
}
