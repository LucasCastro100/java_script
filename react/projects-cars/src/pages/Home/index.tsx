  import { useEffect, useState } from "react";
import { ListCar } from "../../components/Car/List";
import { CarsProps } from "../../types/ListCars";
import { collection, endAt, getDocs, orderBy, query, startAt } from "firebase/firestore";
import { db } from "../../services/firebaseConection";

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [search, setSearch] = useState('')

 function handleSearch(){
  const carsRef = collection(db, 'cars');  
  // A string '\uf8ff' é um caractere Unicode muito alto que garante
  // que o intervalo inclua todas as strings que começam com search.
  const end_term = search + '\uf8ff'; 

  const queryRef = query(
    carsRef, 
    orderBy('name'), // Obrigatório para usar startAt/endAt
    startAt(search), 
    endAt(end_term)
  );

  getDocs(queryRef).then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }).catch(err => {
    console.error("Erro na busca: ", err);
  });
}

  async function loadCars() {
    const carsRef = collection(db, 'cars')
    const queryRef = query(carsRef, orderBy('createdAt', 'desc'))

    getDocs(queryRef).then((snapshot) => {
      const list: any = []

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          uid: doc.data().uid,
          price: doc.data().price,
          city: doc.data().city,
          km: doc.data().km,
          images: doc.data().images,
        })
      })

      setCars(list)
    })
  }

  useEffect(() => {
    loadCars()
  }, [])
  return (
    <div className="space-y-8">
      <div className="flex flex-row gap-4 max-w-3xl mx-auto">
        <input type="text" name="search" placeholder="Busque um veículo..." onChange={(e) => setSearch(e.target.value)} className="border-2 rounded-md border-gray-200 p-2 flex-1"/>
        <button onClick={handleSearch} className="border-2 rounded-md border-gray-200 bg-gray-500 px-4 py-2 cursor-pointer">Pesquisar</button>
      </div>

      {cars.length === 0 ? (
        <div className="text-center text-gray-200">
          Nenhum veiculo cadastrado!
        </div>
      ) : (
        <ListCar cars={cars} idDelete={false} />
      )}
    </div>
  );
}