export interface GearItem {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface RentalState {
  [gearId: string]: {
    isRented: boolean;
    rentedBy?: string; // stored for simulation, though we only use local user
    rentedAt?: number;
  };
}