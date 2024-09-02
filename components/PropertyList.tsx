'use client'
import React, { useState } from 'react'
import PropertyCard from './PropertyCard'
import Filter from './Filter'
import { useBooking } from '../context/BookingContext'
import BookingModal from './BookingModal'
import Checkout from '../components/Checkout'

type Property = {
  id: number
  title: string
  description: string
  price: number
  image: string
  location: string
  bedrooms: number
  bathrooms: number
  amenities: string[]
}

type Filters = {
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  amenities?: string[]
}

type PropertyListProps = {
  properties: Property[]
  // onBook: (id: number) => void;
}

type Booking = {
  id: string
  property: Property
  quantity: number
  dates: { start: string; end: string }
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const [filters, setFilters] = useState<Filters>({})
  const { addBooking, checkingOut } = useBooking()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  )

  const handleBook = (property: Property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const filteredProperties = properties.filter(property => {
    const { location, minPrice, maxPrice, bedrooms, amenities } = filters

    const matchesLocation = location
      ? property.location.includes(location)
      : true
    const matchesPrice =
      (!minPrice || property.price >= minPrice) &&
      (!maxPrice || property.price <= maxPrice)
    const matchesBedrooms = bedrooms ? property.bedrooms >= bedrooms : true
    const matchesAmenities = amenities
      ? amenities.every(amenity =>
          property.amenities.some(
            propertyAmenity =>
              propertyAmenity.toLowerCase() === amenity.toLowerCase()
          )
        )
      : true

    return (
      matchesLocation && matchesPrice && matchesBedrooms && matchesAmenities
    )
  })

  const handleConfirmBooking = (dates: {
    startDate: Date | undefined
    endDate: Date | undefined
  }) => {
    if (selectedProperty && dates.startDate && dates.endDate) {
      const newBooking: Booking = {
        id: `${selectedProperty.id}-${dates.startDate.getTime()}-${dates.endDate.getTime()}`, // Unique ID for the booking
        property: selectedProperty,
        quantity: 1, // Assuming 1 booking per property
        dates: {
          start: dates.startDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
          end: dates.endDate.toISOString().split('T')[0]
        }
      }
      addBooking(newBooking)
    }
  }

  return (
    <>
      {checkingOut ? (
        <Checkout />
      ) : (
        <>
          <div>
            <Filter onFilterChange={setFilters} />
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onBook={() => handleBook(property)}
                />
              ))}
            </div>
          </div>
          {selectedProperty && (
            <BookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirmBooking}
            />
          )}
        </>
      )}
    </>
  )
}

export default PropertyList
