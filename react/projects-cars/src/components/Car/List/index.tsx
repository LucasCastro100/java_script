import { CardCar } from "../Card"
import { CarsProps } from "../../../types/ListCars"

type ListCarProps = {
  cars: CarsProps[]
  idDelete?: boolean
}

export function ListCar({ cars, idDelete }: ListCarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {cars.map(car => (
        <CardCar key={car.id} data={car} isDelete={idDelete} />
      ))}
    </div>
  )
}
