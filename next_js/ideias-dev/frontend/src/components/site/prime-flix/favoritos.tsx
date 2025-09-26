'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

type MovieFavorit = {
    id: number;
    title: string;
    image: string;
};

export const FilmesFavoritos = () => {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<MovieFavorit[]>([]);

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

    const notify = () => toast.success("Filme removido com sucesso!", {
        theme: "colored",
    });

    // Carregar favoritos do localStorage
    useEffect(() => {
        const listMovies = localStorage.getItem("primeFlix");
        if (listMovies) {
            setFavorites(JSON.parse(listMovies));
        }
        setLoading(false);
    }, []);

    // Função para remover favoritos
    const removeFavorites = (id: number) => {
        notify()
        const newListMovies = favorites.filter((item) => item.id !== id);
        setFavorites(newListMovies);
        localStorage.setItem("primeFlix", JSON.stringify(newListMovies));
    };

    return (
        <div>
            {loading ? (
                <div className="text-white text-2xl font-bold animate-pulse">
                    Carregando...
                </div>
            ) : (
                <>
                <ToastContainer />
                    <h2 className="text-lg text-center mb-4">Favoritos</h2>

                    {favorites.length === 0 ? (
                        <p className="text-center text-gray-500">Nenhum filme salvo.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {favorites.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-md border border-gray-300 flex flex-col"
                                >
                                    <div className="relative w-full">
                                        <img
                                            src={`${IMAGE_BASE_URL}${item.image}`}
                                            alt={item.title}
                                            loading="lazy"
                                            className="rounded-t-md"
                                        />
                                    </div>

                                    <div className="py-2 px-4 flex flex-col h-full">
                                        <div className="flex-1">
                                            <p className="font-bold">{item.title}</p>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center justify-center gap-1 mt-4">
                                            <button
                                                className="w-full rounded-md font-semibold flex items-center justify-center bg-red-200 hover:bg-red-500 py-2 px-4"
                                                onClick={() => removeFavorites(item.id)}
                                            >
                                                <FaRegTrashAlt />
                                            </button>

                                            <Link
                                                href={`/projetos/prime-flix/${item.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center rounded-md font-semibold text-center bg-green-200 hover:bg-green-500 py-2 px-4"
                                            >
                                                <FaEye />
                                            </Link>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
