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