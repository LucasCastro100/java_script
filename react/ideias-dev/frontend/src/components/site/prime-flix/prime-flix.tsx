'use client'

import { formatDate } from "@/helpers/date-filter"
import { api } from "@/services/prime-flix/service"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export const PrimeFlix = () => {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const API_KEY = "0eb9788f9cf695e61f8e21b7637b58af"
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const loadMovies = async (pageNumber: number = 1) => {
    setLoading(true)
    setMovies([])
    try {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          page: pageNumber,
        },
      })

      setMovies(response.data.results)
      setPage(response.data.page)
      setTotalPages(response.data.total_pages)
      setTotalResults(response.data.total_results)

      console.log(response.data.results)
    } catch (err) {
      console.error("Erro ao buscar filmes:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="text-gray-500 text-2xl font-bold animate-pulse text-center">
          Carregando...
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <li key={movie.id} className="rounded-md border border-gray-300 flex flex-col">
                <div className="relative w-full">
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-full">
                  <h3 className="font-semibold text-lg">{movie.title}</h3>

                  <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:justify-between mt-0.5">
                    <Link href={`/projetos/prime-flix/${movie.id}`} className="bg-blue-500 hover:bg-blue-700 text-white text-center w-full p-2 rounded-md">
                      Acessar
                    </Link>

                    <h4 className="">
                      {movie.release_date
                        ? formatDate(new Date(movie.release_date))
                        : "Data desconhecida"}
                    </h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col mt-4 items-center justify-center gap-1">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => loadMovies(page - 1)}
                disabled={page === 1}
                className="mb-4 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={() => loadMovies(page + 1)}
                disabled={page === totalPages}
                className="mb-4 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="text-center font-semibold">
              Página {page} de {totalPages} — {totalResults} filmes encontrados
            </div>
          </div>
        </>
      )}
    </div>
  )
}
