export interface Vaccine {
  name: string;
  date: string;
  daysLeft: number;
}

export interface Medication {
  name: string;
  frequency: string;
  nextDose: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: 'dog' | 'cat';
  description: string;
  weight: string;
}

export interface CartItem extends Product {
  quantity: number;
}