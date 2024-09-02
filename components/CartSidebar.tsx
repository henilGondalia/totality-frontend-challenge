import React , { useState,useEffect }from 'react'
import { useBooking } from '../context/BookingContext'
import { FaTimes, FaTrashAlt, FaCalendarAlt, FaBed } from 'react-icons/fa'
import {useRouter} from 'next/navigation';

const CartSidebar = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { bookings, updateBooking, removeBooking, totalCost,setcheckingOut } = useBooking()
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    // router.push('/checkout');
    setcheckingOut(true)
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 transform bg-white shadow-lg transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className='p-4'>
        <div className='flow-root items-center border-b'>
          <h2 className='my-4 text-xl font-bold float-left'>Your Cart</h2>
          <button onClick={onClose} className='my-4 flex items-center text-red-600 justify-end float-right'>
            <FaTimes className='mr-2' />
          </button>
        </div>
        <ul>
          {bookings.map(booking => (
            <li
              key={booking.id}
              className='my-2 flex items-center justify-between border p-2'
            >
              <div>
                <h3 className='text-xl font-semibold mb-2'>{booking.property.title}</h3>
                <p className='flex items-center'>
                  <FaCalendarAlt className='mr-2' />
                  {booking.dates.start} to {booking.dates.end}
                </p>
                <div>
                  <button
                    onClick={() =>
                      updateBooking(booking.id, booking.quantity - 1)
                    }
                    className='px-2 py-1 text-lg font-bold'
                  >
                    -
                  </button>
                  <span className='mx-2'>{booking.quantity}</span>
                  <button
                    onClick={() =>
                      updateBooking(booking.id, booking.quantity + 1)
                    }
                    className='px-2 py-1 text-lg font-bold'
                  >
                    +
                  </button>
                </div>
                <p className='flex items-center'>
                  <FaBed className='mr-2' />{booking.quantity} x{' '}
                   ${booking.property.price}
                </p>
              </div>
              <div className='flex items-center'>
                
                <button
                  onClick={() => removeBooking(booking.id)}
                  className='ml-2 flex items-center text-red-600'
                >
                  <FaTrashAlt className='mr-1' />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className='mt-4 border-t pt-4'>
          <p>Total Cost: ${totalCost}</p>
          <button className='mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white' onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartSidebar
