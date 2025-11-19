import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";

export function CarDetail() {
    const { uid } = useParams();
    const [car, setCar] = useState<any>(null);

    useEffect(() => {
        async function loadCar() {
            if (!uid) return;

            const docRef = doc(db, "cars", uid);
            const snapshot = await getDoc(docRef);

            if (snapshot.exists()) {
                const data = snapshot.data();

                setCar({
                    id: snapshot.id,
                    name: data.name,
                    year: data.year,
                    uid: data.uid,
                    price: data.price,
                    city: data.city,
                    km: data.km,
                    images: data.images
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
                <div className="mt-4">
                    <p>Nome: {car.name}</p>
                    <p>Ano: {car.year}</p>
                    <p>Preço: {car.price}</p>
                    <p>Cidade: {car.city}</p>
                    <p>KM: {car.km}</p>


                    {car.images?.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {car.images.map((img: string, index: number) => {
                                
                                return <img key={index} src={img.url} className="rounded" />
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
