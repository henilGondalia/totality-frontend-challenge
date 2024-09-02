import React from 'react';
import { useBooking } from '../context/BookingContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = ({ onClick }: { onClick: () => void }) => {
  const { totalItems } = useBooking();

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <FaShoppingCart className="text-2xl" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
