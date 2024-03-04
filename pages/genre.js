import React, {useState, useEffect} from "react"
import Navbar from "../components/navbar"
import Container from "../components/container"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Series() {
    const [action, setAction] = useState([])
    const [fantasy, setFantasy] = useState([])
    const [comedy, setComedy] = useState([])

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

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6&with_genres=14')
            const data = await response.json()
            setFantasy(data.results)
          } catch (error) {
            console.error('Error fetching movies:', error)
          }
        }
      
        fetchMovies()
    }, [])

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6&with_genres=35')
            const data = await response.json()
            setComedy(data.results)
          } catch (error) {
            console.error('Error fetching movies:', error)
          }
        }
      
        fetchMovies()
    }, [])

    return(
        <>
            <Navbar/>
            <Container>
                <div className="mt-5">
                    <div className="text-xl font-medium">Action</div>
                    <div className="mt-0">
                        <Slider {...settings}>
                            {action.map(movie => (
                            <div className="overflow-hidden shadow-lg p-5">
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
                <div className="mt-5">
                    <div className="text-xl font-medium">Fantasy</div>
                    <div className="mt-0">
                        <Slider {...settings}>
                            {fantasy.map(movie => (
                            <div className="overflow-hidden shadow-lg p-5">
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
                <div className="mt-5">
                    <div className="text-xl font-medium">Comedy</div>
                    <div className="mt-0">
                        <Slider {...settings}>
                            {comedy.map(movie => (
                            <div className="overflow-hidden shadow-lg p-5">
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
            </Container>
        </>
    )
}