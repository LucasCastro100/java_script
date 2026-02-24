export type Product = {
    id: number;
    label: string;
    images: string[];
    price: number;
    liked: boolean;
    views?: number;
    solds?: number;
    description: string;
}