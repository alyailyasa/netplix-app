import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function SearchPage() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const searchTerm = router.query.q || '';

  useEffect(() => {
    const fetchSearchResults = async (searchTerm) => {
      try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6&query=${encodedSearchTerm}&include_adult=false&language=en-US&page=1`);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      {searchResults.map(movie => (
        <div key={movie.id}>
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
}
