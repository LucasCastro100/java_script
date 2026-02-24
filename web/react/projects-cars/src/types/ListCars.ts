export interface CarsProps {
    id: string;    
    name: string;    
    year: number;
    uid: string;
    price: number;
    city: string;
    km: number;
    images: CarImageProps[];    
}

export interface CarImageProps {
    name: string;
    url: string;
    uid: string;
}