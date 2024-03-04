import React, {useState, useEffect} from "react"
import Navbar from "../components/navbar"
import Container from "../components/container"

export default function Series() {
    const [series, setSeries] = useState([])
    
    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=dfd426c27ceb6d9813e4e845a429b3b6&sort_by=popularity.desc&page=1')
            const data = await response.json()
            setSeries(data.results)
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
                <div className="grid xl:grid-cols-6 md:grid-cols-5 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4">
                    {series.map(movie => (
                        <div className="overflow-hidden shadow-lg cursor-pointer">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                                alt={movie.title} 
                                className="w-full lg:h-[280px] h-auto"
                            />
                            <div className="pt-4 pb-4 pr-2">
                            <h2 className="font-bold text-lg max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis leading-[20px] px-2">{movie.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}