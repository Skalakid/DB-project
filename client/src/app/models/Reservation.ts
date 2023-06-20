export interface Reservation {
  userId: number;
  reservationId: number;
  vehicleId: number;
  r_begin: string;
  r_end: string;
  cost: number;
  duration?: string;
}
