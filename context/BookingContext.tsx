import React, { createContext, useContext, useState } from 'react';

type Property = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
};

type Booking = {
  id: string;
  property: Property;
  quantity: number;
  dates: { start: string; end: string };
};

type BookingContextType = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, quantity: number) => void;
  removeBooking: (id: string) => void;
  totalItems: number;
  totalCost: number;
  checkingOut: boolean;
  setcheckingOut: (checkingOut: boolean) => void;

};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [checkingOut, setcheckingOut] = useState<boolean>(false);

  const addBooking = (booking: Booking) => {
    setBookings((prevBookings) => [...prevBookings, booking]);
  };

  const updateBooking = (id: string, quantity: number) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, quantity } : booking
      )
    );
  };

  const removeBooking = (id: string) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };


  const totalItems = bookings.reduce((acc, booking) => acc + booking.quantity, 0);
  const totalCost = bookings.reduce((acc, booking) => acc + booking.property.price * booking.quantity, 0);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBooking, removeBooking, totalItems, totalCost, checkingOut, setcheckingOut }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
