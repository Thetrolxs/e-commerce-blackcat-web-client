export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    category?: string;
    urls: string[];
    stock?: number;
    brand?: string;
    publicId?: string | null;
    isActive?: boolean;
    condition?: number;
}
