export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number | null;
  gender: string;
  weight: number | null;
  image: string;
}
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


export interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'veterinary' | 'dog_park';
  address?: string;
  phone?: string;
  openingHours?: string;
  rating?: number;
}