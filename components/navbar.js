import React from "react"
import Link from "next/link"
import { useState } from "react"
import 'tailwindcss/tailwind.css'
import { useRouter } from "next/router"

export default function Navbar() {

  const [ showSidebar, setShowSidebar ] = useState(false)
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    router.push({
      pathname: '/search',
      query: { q: searchTerm }
    })
    console.log(searchTerm)
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
  }
  const clearInput = () => {
    setSearchTerm('')
  }


  return (
    <div className="z-[1000] mx-auto lg:bg-transparent lg:shadow-none">
      <nav className="w-full pb-[1.5rem] pt-[1.5rem] xl:px-[120px] lg:px-auto px-4">
        <div className="flex justify-between">
          <Link href="/">
            <div className="text-2xl flex items-center justify-center pt-6 list-none lg:pt-0 cursor-pointer">Netplix</div>
          </Link>
          <div className="flex justify-between">   
            <div className="hidden lg:flex ml-[-200px]">
              <ul className="flex items-center justify-center pt-6 list-none lg:pt-0">
                <li className="hidden lg:flex mr-2">
                  <Link legacyBehavior href="/series">
                    <a className="inline-block w-max px-3 py-2 text-[13px] font-bold leading-5 tracking-widest uppercase  no-underline rounded-md focus:outline-none">
                      Series
                    </a>
                  </Link>
                </li>
                <li className="hidden lg:flex mr-2">
                  <Link legacyBehavior href="/">
                    <a className="inline-block w-max px-3 py-2 text-[13px] font-bold leading-5 tracking-widest uppercase no-underline rounded-md focus:outline-none">
                      Movies
                    </a>
                  </Link>
                </li>
                <li className="hidden lg:flex mr-2">
                  <Link legacyBehavior href="/genre">
                    <a className="inline-block w-max px-3 py-2 text-[13px] font-bold leading-5 tracking-widest uppercase no-underline rounded-md focus:outline-none">
                      Genre
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:hidden flex items-center justify-stretch navM">
              <span className="text-black text-4xl cursor-pointer p-2 rounded-[3px]" onClick={() => setShowSidebar(!showSidebar)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black flex">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </span>
              <div className={`sidebar fixed bg-white h-full w-[280px] flex-none top-0 pt-[30px] z-[9999] ${showSidebar ? 'left-0' : 'left-[-300px]'}`}>
                <div className="p-2 ml-2 cursor-pointer px-4">
                  <div onClick={() => setShowSidebar(!showSidebar)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black float-right right-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <Link href="/">
                    <button className="focus:outline-none mt-5">
                      <div className="text-2xl">Netplix</div>
                    </button>
                  </Link>
                </div>
                <div className="mt-8 ml-3 text-[16px] font-bold flex flex-col gap-3">
                  <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-trueGray-200 ">
                    <Link legacyBehavior href="/series">
                      <span>
                        Series 
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-trueGray-200 ">
                    <Link legacyBehavior href="/">
                      <span>
                        Movies
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-trueGray-200 ">
                    <Link legacyBehavior href="/genre">
                      <span>
                        Genre
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-trueGray-200 ">
                    <form onSubmit={handleSearch}>
                      <div className="flex gap-2 items-center w-full border border-gray-300 rounded p-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search movies"
                          className="w-full p-1"
                          value={searchTerm}
                          onChange={handleChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={clearInput}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <form onSubmit={handleSearch}>
              <div className="flex gap-2 items-center w-[300px] border border-gray-300 rounded p-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search movies"
                  className="w-[300px] p-1"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={clearInput}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}