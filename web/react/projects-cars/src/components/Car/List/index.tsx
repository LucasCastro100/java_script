import { CardCar } from "../Card";
import { CarsProps } from "../../../types/ListCars";

type ListCarProps = {
  cars: CarsProps[];
  isDelete?: boolean;
};

export function ListCar({ cars, isDelete }: ListCarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {cars.length === 0 ? (
        <div className="col-span-full">
          <p className="text-center">Nenhum veículo encontrado.</p>
        </div>
      ) : (
        cars.map((car) => (
          <CardCar key={car.id} data={car} isDelete={isDelete} />
        ))
      )}
    </div>
  );
}
