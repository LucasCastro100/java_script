import { CardCar } from "../Card"
import type { CardCar as CardCarType } from "../../../types/CardCar"

const cars: CardCarType[] = [
  { uid: "1", img: "/cars/civic.jpg", name: "Honda Civic EXL", year: "2020", km: "32.500", city: "São Paulo - SP" },
  { uid: "2", img: "/cars/corolla.jpg", name: "Toyota Corolla Altis", year: "2021", km: "28.000", city: "Rio de Janeiro - RJ" },
  { uid: "3", img: "/cars/golf.jpg", name: "Volkswagen Golf TSI", year: "2019", km: "45.000", city: "Curitiba - PR" },
  { uid: "4", img: "/cars/hrv.jpg", name: "Honda HR-V Touring", year: "2022", km: "18.200", city: "Belo Horizonte - MG" },
  { uid: "5", img: "/cars/compass.jpg", name: "Jeep Compass Longitude", year: "2023", km: "10.500", city: "Brasília - DF" },
  { uid: "6", img: "/cars/creta.jpg", name: "Hyundai Creta Prestige", year: "2020", km: "38.400", city: "Recife - PE" },
  { uid: "7", img: "/cars/renegade.jpg", name: "Jeep Renegade Sport", year: "2021", km: "26.900", city: "Porto Alegre - RS" },
  { uid: "8", img: "/cars/kicks.jpg", name: "Nissan Kicks SL", year: "2019", km: "41.300", city: "Salvador - BA" },
]

export function ListCar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {
        cars.map(car => (
          <CardCar key={car.uid} data={car} />
        ))
      }
    </div>
  )
}