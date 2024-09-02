// components/BookingModal.tsx
import React, { useState } from 'react';
import {  Modal, ModalContent, ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';


type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dates: { startDate: Date | undefined; endDate: Date | undefined }) => void;
};

type BookingDateRange = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
};

const defaultRange: BookingDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedRange, setSelectedRange] = useState<BookingDateRange>(defaultRange);

  const handleConfirm = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      onConfirm({
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
      });
      onClose();
      setSelectedRange(defaultRange)
    } else {
      alert("Please select a valid date range.");
    }
  };

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;
    setSelectedRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: 'selection'
    });
  };

  return (
    <Modal isOpen={isOpen} size="sm" placement="center">
      <ModalContent className="max-w-md mx-auto p-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                  Select Booking Dates
              </ModalHeader>
              <ModalBody>
              <DateRange
                minDate={addDays(new Date(), 0)}
                maxDate={addDays(new Date(), 60)}
                ranges={[selectedRange]}
                onChange={handleDateChange}
              />
              </ModalBody>
              <ModalFooter>
                <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={onClose}>
                  Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConfirm}>
                  Confirm
                </button>
              </ModalFooter>
            </>
             )}
        </ModalContent>
    </Modal>
  );
};

export default BookingModal;
