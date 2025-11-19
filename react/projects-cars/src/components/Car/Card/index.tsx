import { Link, useNavigate } from "react-router-dom"
import { CarsProps } from "../../../types/ListCars"
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../services/firebaseConection";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

type CardCardProps = {
    data: CarsProps
    isDelete?: boolean
}

export function CardCar({ data, isDelete }: CardCardProps) {
    console.log("Delete", isDelete)
    const [loadImages, setLoadImages] = useState<string[]>([]);
    const navigate = useNavigate();

    // Função para lidar com o evento de carregamento da imagem
    function handleImageLoad(id: string) {
        setLoadImages((prevImageLoad) => [...prevImageLoad, id]);
    }

    async function handleDeleteCar(car: CarsProps) {
        const carRef = doc(db, 'cars', car.id);
        await deleteDoc(carRef);

        car.images.map(async (image) => {
            const imagesPath = `images/${image.uid}/${image.name}`;
            const imagemRef = ref(storage, imagesPath)

            try {
                await deleteObject(imagemRef)                
                toast.success("Carro deletado com sucesso!");
            } catch (error) {
                toast.success("Erro ao deletar iamgens!");
            }
        })
    }

    return (
        <div className="w-full rounded-xl border-2 border-gray-500 relative">
            {
                isDelete && (
                    <button className="absolute top-2 right-2 cursor-pointer z-50 bg-white rounded-full p-2" onClick={() => handleDeleteCar(data)}>
                        <FiTrash size={25} color="black" />
                    </button>
                )
            }

            <Link to={`/car-detail/${data.id}`}>
                <div className="z-0">
                    <div className="">
                        <div className="w-full bg-gray-800 h-72 rounded-t-xl" style={{ display: loadImages.includes(data.id) ? "none" : "block" }}></div>
                    </div>

                    <img src={data.images[0].url} alt={data.name} className="rounded-t-xl" onLoad={() => handleImageLoad(data.id)}
                        style={{ display: loadImages.includes(data.id) ? "block" : "none" }} />
                </div>
                <div className="flex flex-col">
                    <div className="p-4 space-y-2">
                        <div className="font-bold text-xl text-white">{data.name}</div>
                        <div className="font-medium text-gray-500">Ano {data.year} | {data.km} km</div>
                        <div className="font-bold text-white text-2xl">R$ {data.price}</div>
                    </div>

                    <div className="border-t-2 border-t-gray-500">
                        <div className="p-4">
                            {data.city}
                        </div>
                    </div>
                </div>
            </Link >
        </div>
    )
}