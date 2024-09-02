import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { BookingProvider, useBooking } from '../context/BookingContext';
import { FaAngleLeft } from "react-icons/fa";

const stripePromise = loadStripe('your-publishable-key-here');

const Checkout: React.FC = () => {
  // Ensure this hook is used within the BookingProvider
  const { bookings, totalCost, setcheckingOut } = useBooking();

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
      <h2 className="text-2xl font-bold mb-4 flex"> 
        <button onClick={() => setcheckingOut(false)}><FaAngleLeft /></button> 
        Checkout
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="mb-2">
              <p>{booking.property.title}</p>
              <p>
                {booking.dates.start} to {booking.dates.end}
              </p>
              <p>
                {booking.quantity} x ${booking.property.price}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-bold">Total Cost: ${totalCost}</p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

// Wrap the Checkout component with BookingProvider
export default Checkout;