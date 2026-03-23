export interface Reservation {
  id: string
  full_name: string
  email: string
  phone: string
  reservation_date: string
  reservation_time: string
  guests: number
  special_requests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: 'starters' | 'mains' | 'desserts' | 'drinks'
  badge?: string
  spicy?: boolean
}

export type ReservationInsert = Omit<Reservation, 'id' | 'created_at' | 'status'>
export type ContactInsert     = Omit<Contact, 'id' | 'created_at'>
