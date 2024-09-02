import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useBooking } from '../context/BookingContext';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { bookings } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      setErrorMessage(error.message || 'An error occurred during payment.');
      setIsProcessing(false);
      return;
    }

    // Here you would send `paymentMethod.id` to your backend to create a payment intent
    // and complete the payment process

    setIsProcessing(false);
    setSuccessMessage('Thank you! Your booking is confirmed.');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <CardElement />
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        {isProcessing ? 'Processing...' : 'Confirm Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
