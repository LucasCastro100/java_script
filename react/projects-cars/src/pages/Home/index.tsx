import { useEffect, useState } from "react";
import { ListCar } from "../../components/Car/List";
import { CarsProps } from "../../types/ListCars";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConection";

export function Home() {
    const [cars, setCars] = useState<CarsProps[]>([]);

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
        <div className="">
            <div className="">Home</div>

            <ListCar cars={cars} idDelete={false}/>
        </div>
    );
}