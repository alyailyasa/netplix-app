import { React, useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import 'tailwindcss/tailwind.css'
import Container from '../components/container'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SliderBanner from '../components/SliderBanner'
import Head from 'next/head'

export default function index() {
  const [movies, setMovies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [trailerKey, setTrailerKey] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [action, setAction] = useState([])

  const closeModal = () => {
    setShowModal(false)
    setTrailerKey('')
  }

  const stopPropagation = (event) => {
    event.stopPropagation()
  }

  const openModal = async (movie) => {
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6')
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error('Error fetching action movies:', error)
      }
    }

    fetchMovies()
  }, [])

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    accessibility: true,
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }

useEffect(() => {
  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6&with_genres=28')
      const data = await response.json()
      setAction(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  fetchMovies()
}, [])

  return (
    <>
      <Head>
        <title>Netplix - Movies</title>
      </Head>
      <Navbar/>
      <Container>
        <div className="w-full">
          <SliderBanner/>
          <div className="mt-14">
            <div className="text-xl font-medium">Latest</div>
            <div className="mt-3">
              <Slider {...settings}>
                {movies.map(movie => (
                  <div className="overflow-hidden shadow-lg cursor-pointer p-5" onClick={() => openModal(movie)}>
                    <img 
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                      alt={movie.title} 
                      className="w-full lg:h-[280px] h-auto"
                    />
                    <div className="pt-4 pb-4 pr-2">
                      <h2 className="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis leading-[20px]">{movie.title}</h2>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="mt-14">
            <div className="text-xl font-medium">Action</div>
            <div className="mt-3">
              <Slider {...settings}>
                {action.map(movie => (
                  <div className="overflow-hidden shadow-lg cursor-pointer p-5" onClick={() => openModal(movie)}>
                    <img 
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                      alt={movie.title} 
                      className="w-full lg:h-[280px] h-auto"
                    />
                    <div className="pt-4 pb-4 pr-2">
                      <h2 className="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis leading-[20px]">{movie.title}</h2>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
              <div className="bg-white p-4 lg:w-[900px] w-auto lg:h-[500px] h-auto rounded-lg flex flex-col" onClick={stopPropagation}>
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
        </div>
      </Container>
    </>
  )
}
