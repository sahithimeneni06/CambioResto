import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import ThreeDModal from './components/ThreeDModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'menu'
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  
  // 3D Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Cart actions
  const handleAddToCart = (item, quantity = 1, customization = 'standard preparation') => {
    setCartItems(prevItems => {
      // Check if item with same ID and same customization already exists
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.id === item.id && cartItem.customization === customization
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { ...item, quantity, customization }];
      }
    });

    // Trigger cart badge micro-animation
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 500);
  };

  const handleUpdateQuantity = (id, customization, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id, customization);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === id && item.customization === customization) 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const handleRemoveFromCart = (id, customization) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.customization === customization))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpen3D = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleClose3D = () => {
    setIsModalOpen(false);
    // Don't clear selectedItem immediately to allow animations to finish
    setTimeout(() => setSelectedItem(null), 400);
  };

  // Calculate cart counts
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        isCartBouncing={isCartBouncing}
      />

      {/* Main Pages */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' ? (
          <Hero setActiveTab={setActiveTab} />
        ) : (
          <Menu 
            onAddToCart={(item) => handleAddToCart(item, 1, item.customizations ? `${item.customizations.type}: ${item.customizations.options[0]}` : 'standard preparation')} 
            onOpen3D={handleOpen3D}
          />
        )}
      </main>

      {/* 3D Viewer Dialog */}
      <ThreeDModal 
        isOpen={isModalOpen} 
        onClose={handleClose3D} 
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Sidebar */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Footer Details */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
