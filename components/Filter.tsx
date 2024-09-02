import React, { useState } from 'react';
import {Select, SelectItem} from "@nextui-org/select";

type FilterProps = {
  onFilterChange: (filters: Filters) => void;
};

type Filters = {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [bedrooms, setBedrooms] = useState<number | undefined>(undefined);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({
      location,
      minPrice,
      maxPrice,
      bedrooms,
      amenities,
    });
  };

  const handleAmenitiesChange = (selectedKeys: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOptions = selectedKeys.target.value ? selectedKeys.target.value.split(',').map(amenity => amenity.trim()) : [];
      setAmenities(selectedOptions);
      handleFilterChange();
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2 rounded-md w-full md:w-1/3"
            />
            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border p-2 rounded-md w-full md:w-1/6"
            />
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border p-2 rounded-md w-full md:w-1/6"
            />
            <input
                type="number"
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="border p-2 rounded-md w-full md:w-1/6"
            />
            <Select
                selectionMode="multiple"
                label="Select Amenities"
                value={amenities}
                onChange={(e) => handleAmenitiesChange(e)}
                className="border rounded-xl w-full md:w-1/3"
            >
                <SelectItem key="wifi">Wi-Fi</SelectItem>
                <SelectItem key="pool">Pool</SelectItem>
                <SelectItem key="parking">Parking</SelectItem>
                <SelectItem key="gym">Gym</SelectItem>
            </Select>
            <button
                onClick={handleFilterChange}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Apply Filters
            </button>
        </div>
    </div>
  );
};

export default Filter;
