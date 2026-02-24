'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';

const API_KEY = "0eb9788f9cf695e61f8e21b7637b58af";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

type MovieFavorit = {
  id: number;
  title: string;
  image: string;
}

export const MovieSelected = () => {
  const router = useRouter();
  const { movie_id } = useParams();
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const notifySuccess = () => toast.success("Filme adicionado com sucesso!", {
    theme: "colored",
  });

  const notifyWarning = () => toast.warn("Esse filme já esta em sua lsita de favoritos!", {
    theme: "colored",
  });

  const loadMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}`,
        {
          params: {
            language: "pt-BR",
            api_key: API_KEY,
          },
        }
      );

      setMovie(response.data || null);
      console.log(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do filme:", err);
      router.push('/projetos/prime-flix')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovie();
  }, [movie_id, router]);

  const addFavorites = () => {
    const listMovies = localStorage.getItem("primeFlix")
    let moviesSaved: MovieFavorit[] = listMovies ? JSON.parse(listMovies) : []

    //verifica duplicado
    const hasMovie = moviesSaved.some((savedMovies) => savedMovies.id === movie.id)

    if (hasMovie) {
      notifyWarning()
      return;
    }

    moviesSaved.push({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path
    });

    localStorage.setItem("primeFlix", JSON.stringify(moviesSaved))
    notifySuccess()
  }

  if (loading) {
    return <div className="text-gray-500 text-2xl font-bold animate-pulse">Carregando...</div>;
  }

  if (!movie) {
    return <div className="text-gray-500 text-2xl font-bold animate-pulse">Carregando...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : "/placeholder.jpg"}
            alt={movie.title || "Sem título"}
            loading="lazy"
            className="rounded-md shadow"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex-1">
            <h3 className="text-center font-bold text-gray-700">{movie.title}</h3>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-700">Sinopse</h3>
            <p>{movie.overview || "Sinopse não disponível."}</p>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-700">Gêneros</h3>

              <div className="flex flex-col md:flex-row gap-4">
                {movie?.genres?.map((genre: any) => (
                  <p key={genre.id}>{genre.name || "Gênero não disponível."}</p>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-700">Avaliação</h3>
              <p>{movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : "Sem avaliação"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
        <button className="rounded-md font-semibold text-center bg-blue-400 hover:bg-blue-700 py-2 px-4" onClick={addFavorites}>Adicionar Favoritos</button>

        <Link href={`https://www.youtube.com/results?search_query=${movie.title}`} target="_blank" rel="noopener noreferrer" className="rounded-md font-semibold text-center bg-green-400 hover:bg-green-700 py-2 px-4">Assistir Trailer</Link>
      </div>
    </>
  );
};
