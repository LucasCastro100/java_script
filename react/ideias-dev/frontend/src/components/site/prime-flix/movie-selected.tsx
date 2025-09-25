'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const API_KEY = "0eb9788f9cf695e61f8e21b7637b58af";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const MovieSelected = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMovieDetails = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!movie) {
    return <p>Carregando...</p>;
  }

  return (
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

        <div className="flex-1">
          <h3 className="font-semibold text-gray-700">Avaliação</h3>
          <p>{movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : "Sem avaliação"}</p>
        </div>
      </div>
    </div>
  );
};
