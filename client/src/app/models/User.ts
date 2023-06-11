export interface User {
  accessToken: string;
  refreshToken: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UserStats {
  noReservations: number;
  totalCost: number;
}
