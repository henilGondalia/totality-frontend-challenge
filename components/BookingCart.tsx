// components/BookingCart.tsx
import React from 'react';

type Booking = {
  id: number;
  title: string;
  price: number;
};

type BookingCartProps = {
  bookings: Booking[];
  onRemove: (id: number) => void;
};

const BookingCart: React.FC<BookingCartProps> = ({ bookings, onRemove }) => {
  const total = bookings.reduce((acc, booking) => acc + booking.price, 0);

  return (
    <div className="booking-cart">
      <h2>Your Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>{booking.title}</p>
          <p>${booking.price}/night</p>
          <button onClick={() => onRemove(booking.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default BookingCart;
