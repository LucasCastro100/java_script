import { useEffect, useState } from "react";
import { ListCar } from "../../components/Car/List";
import { CarsProps } from "../../types/ListCars";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConection";

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [search, setSearch] = useState("")
  const carsRef = collection(db, 'cars')

  async function handleSearchCars() {
    const queryRef = query(carsRef, where('name', '==', search))

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

      console.log(list)
      // setSearch(list)
    })
  }

  async function loadCars() {

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
      <div className="mx-auto max-w-3xl flex flex-col md:flex-row gap-4 items-center justify-center">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-500 text-white px-4 py-2 flex-1 rounded-xl" placeholder="Pesquise um veículo..." />
        <button className="bg-gray-500 rounded-xl px-4 py-2" onClick={handleSearchCars}>Pesquisar</button>
      </div>

      <ListCar cars={cars} idDelete={false} />
    </div>
  );
}