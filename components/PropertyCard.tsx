import React from 'react';

type PropertyCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  onBook: (id: number) => void;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ id, title, description, price, image, location, onBook }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden property-card">
      <img src={image} alt={title} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-gray-900 font-bold mb-4">${price}/night</p>
        <div className="text-sm text-gray-500">{location}</div>
        <button onClick={() => onBook(id)} className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Book Now</button>
      </div>
    </div>
  );
};

export default PropertyCard;
