export type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string | null;
  sort_order: number;
  created_at: string;
};

export type Reservation = {
  id: string;
  client_name: string;
  email: string;
  phone: string;
  service: string;
  booking_date: string;
  booking_time: string;
  message: string | null;
  status: ReservationStatus;
  created_at: string;
};

export type Admin = {
  id: string;
  email: string;
  role: string;
  user_id: string | null;
  created_at: string;
};

export type CreateReservationInput = {
  client_name: string;
  email: string;
  phone: string;
  service: string;
  booking_date: string;
  booking_time: string;
  message?: string;
};

export type ServiceInput = {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image?: string | null;
  sort_order?: number;
};
