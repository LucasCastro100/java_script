import { Link } from "react-router-dom";
import { Container } from "../../../components/Cointainer";
import { HeaderDashboard } from "../../../components/Header/dashboard";
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseConection";
import { AuthContext } from "../../../contexts/Auth";
import { CarsProps } from "../../../types/ListCars";
import { ListCar } from "../../../components/Car/List";

export function MyCars() {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState<CarsProps[]>([]);

    useEffect(() => {
        if (!user?.uid) return;
    
        const carsRef = collection(db, "cars");
        const queryRef = query(carsRef, where("uid", "==", user.uid));
    
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const list = [] as CarsProps[];
    
            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    year: doc.data().year,
                    km: doc.data().km,
                    price: doc.data().price,
                    city: doc.data().city,
                    uid: doc.data().uid,
                    images: doc.data().images,
                });
            });
    
            setCars(list);
        });
    
        return () => unsubscribe(); // remove listener ao desmontar
    }, []);
    
    return (
        <Container>
            <HeaderDashboard url={'/dashboard'} title={'Perfil'}>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <FaPlus />
                    <Link to="/dashboard/new-car" className="">Novo Carro</Link>
                </div>
            </HeaderDashboard>

            <div className="w-full p-4">
                {cars.length === 0 ? (
                    <div>
                        <div className="text-center text-gray-200">
                            Você ainda não cadastrou nenhum carro.
                        </div>
                        <div className="text-center text-gray-200">
                            Clique em "Novo Carro" para cadastrar seu primeiro veículo.
                        </div>
                    </div>

                ) : (
                    <div>
                        <ListCar cars={cars} isDelete={true}/>
                    </div>
                )}
            </div>
        </Container>
    )
}