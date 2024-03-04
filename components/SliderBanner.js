import React, {useState, useEffect} from "react"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function SliderBanner() {
    const [popularMovies, setPopularMovies] = useState([])
    
    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfd426c27ceb6d9813e4e845a429b3b6&sort_by=popularity.desc&page=1')
            const data = await response.json()
            setPopularMovies(data.results.slice(0, 4))
          } catch (error) {
            console.error('Error fetching movies:', error)
          }
        }
    
        fetchMovies()
    }, [])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        accessibility: true,
        arrows: false, 
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }
        ]
      }
    
    return(
        <>
        <Slider {...settings}>
            {popularMovies.map((movie) => (
              <div key={movie.id} className="w-full lg:h-[300px] h-auto p-5 rounded-3xl overflow-hidden bg-[#fafafa] flex self-center items-center justify-center gap-2">
                <div className="flex justify-around items-center gap-5">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.title} 
                    className="lg:w-[340px] w-[250px] lg:h-[260px] h-[280px]"
                  />
                  <div className="flex flex-col gap-5">
                    <div className="lg:text-xl text-lg font-bold">{movie.title}</div>
                    <div className="lg:text-lg text-base max-w-[520px]">{movie.overview}</div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
    )
}