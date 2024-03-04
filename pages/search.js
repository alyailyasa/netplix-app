import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Container from '../components/container'
import Head from 'next/head'

export default function Search() {
  const router = useRouter()
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [trailerKey, setTrailerKey] = useState('')
  const searchTerm = router.query.q || ''

  useEffect(() => {
    const fetchSearchResults = async (searchTerm) => {
      try {
        const encodedSearchTerm = encodeURIComponent(searchTerm)
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6&query=${encodedSearchTerm}&include_adult=false&language=en-US&page=1`)
        const data = await response.json()
        setSearchResults(data.results)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }

    if (searchTerm.trim() !== '') {
      fetchSearchResults(searchTerm)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const handleCardClick = async (movie) => {
    setSelectedMovie(movie)
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=dfd426c27ceb6d9813e4e845a429b3b6`)
      const data = await response.json()
      const trailer = data.results.find(video => video.type === 'Trailer')
      if (trailer) {
        setTrailerKey(trailer.key)
        setShowModal(true)
      } else {
        console.error('Trailer not found for this movie.')
      }
    } catch (error) {
      console.error('Error fetching trailer:', error)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Head>
        <title>Netplix - Search</title>
      </Head>
      <Navbar/>
      <Container>
        {searchResults.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No results found for "{searchTerm}"</p>
        ) : (
          <>
            <div className="text-xl font-medium">Search</div>
            <div className="mt-5 grid xl:grid-cols-6 md:grid-cols-5 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4">
              {searchResults.map(movie => (
                <div className="overflow-hidden shadow-lg cursor-pointer" key={movie.id} onClick={() => handleCardClick(movie)}>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.title} 
                    className="w-full lg:h-[280px] h-auto"
                  />
                  <div className="pt-4 pb-4 pr-2">
                    <h2 className="font-bold text-lg max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis leading-[20px] px-2">{movie.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>

      {showModal && selectedMovie && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
          <div className="bg-white p-4 lg:w-[900px] w-auto lg:h-[500px] h-auto rounded-lg flex flex-col">
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black float-end">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-full h-full mb-5 flex self-center rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="flex flex-col gap-2 mb-5">
              <h2 className="font-bold text-lg">{selectedMovie.title}</h2>
              <div>{selectedMovie.overview}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
