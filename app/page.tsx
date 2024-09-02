'use client'

import React, { useEffect, useState } from 'react';
import PropertyList from '../components/PropertyList';
import { BookingProvider } from '../context/BookingContext';
import Layout from '../components/Layout';
import axios from 'axios';


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


export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);


  return (
    <BookingProvider>
      <Layout>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <PropertyList properties={properties} />
        </div>
      </Layout>
    </BookingProvider>
  );
}
