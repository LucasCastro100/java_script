import { Link } from "react-router-dom"
import type { CardCar } from "../../../types/CardCar"

type CardCardProps = {
    data: CardCar
}

export function CardCar({data}: CardCardProps){
    return (
        <Link to={`/car-detail/${data.uid}`}>
         <div className="w-full p-4 rounded-xl border-2 border-gray-500">
            <div className="">
                <img src={data.img} alt={data.name} />
            </div>

            <div className="space-y-2">
                <div className="font-bold text-xl text-white">{data.name}</div>
                <div className="font-medium text-gray-500 mb-2">Ano: {data.year} - KM: {data.km}</div>

                <div className="border-t-2 border-t-gray-500 pt-2">
                    {data.city}
                </div>
            </div>
        </div>
        </Link>
       
    )
}