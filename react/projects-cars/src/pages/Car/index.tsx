import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperCube } from "../../components/Swipper/Cube";


export function CarDetail() {
    const { uid } = useParams();
    const [car, setCar] = useState<any>(null);

    useEffect(() => {
        async function loadCar() {
            if (!uid) return;

            const docRef = doc(db, "cars", uid);
            const snapshot = await getDoc(docRef);

            if (snapshot.exists()) {
                const data = snapshot.data()

                setCar({
                    id: snapshot.id,
                    name: data?.name,
                    year: data?.year,
                    city: data?.city,
                    model: data?.model,
                    uid: data?.uid,
                    description: data?.description,
                    createdAt: data?.createdAt.toDate(),
                    price: data?.price,
                    whatsapp: data?.whatsapp,
                    km: data?.km,
                    owner: data?.owner,
                    images: data?.images
                });
            } else {
                console.log("Carro não encontrado.");
            }
        }

        loadCar();
    }, []);

    console.log(car)

    return (
        <div className="text-white">

            {car ? (
                <div className="mt-4 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex items-center justify-center">
                        {car.images?.length > 0 && (
                            <SwiperCube images={car.images} />
                        )}
                    </div>


                    <div className="space-y-4 flex-1">
                        <p><span className="font-semibold">Criado em:</span> {car.createdAt?.toLocaleDateString("pt-BR")}</p>
                        <p><span className="font-semibold">Nome:</span> {car.name}</p>
                        <p><span className="font-semibold">Modelo:</span> {car.model}</p>
                        <p><span className="font-semibold">Ano:</span> {car.year}</p>
                        <p><span className="font-semibold">KM:</span> {car.km}</p>
                        <p><span className="font-semibold">Preço:</span> R$ {car.price}</p>
                        <p><span className="font-semibold">Cidade:</span> {car.city}</p>
                        <p><span className="font-semibold">WhatsApp:</span> {car.whatsapp}</p>
                        <p><span className="font-semibold">Dono:</span> {car.owner}</p>
                        <p><span className="font-semibold">Descrição:</span> {car.description}</p>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
