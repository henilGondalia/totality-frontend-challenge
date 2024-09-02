import React, { useState, ReactNode } from 'react';
import CartIcon from './CartIcon';
import CartSidebar from './CartSidebar';
import "../app/globals.css";


type LayoutProps = {
    children: ReactNode;
  };

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white absolute w-full">
        <h1 className="text-xl">Property Rental</h1>
        <CartIcon onClick={() => setIsCartOpen(true)} />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Layout;
