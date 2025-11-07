export type FuelType = 'Petrol' | 'Diesel';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type UserRole = 'RIDER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
}

export type RequestStatus = 'Pending' | 'En Route' | 'Completed' | 'Cancelled';

export interface FuelRequest {
  id: string;
  userId: string;
  fuelType: FuelType;
  quantity: number;
  location: Coordinates;
  status: RequestStatus;
  createdAt: Date;
  user?: {
    email: string;
  };
}
