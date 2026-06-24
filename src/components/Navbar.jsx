import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu as MenuIcon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, onCartClick, isCartBouncing }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="nav-logo" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>
            CAMBIO<span>.</span>
          </div>

          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={activeTab === 'home' ? 'active' : ''} 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#menu" 
                className={activeTab === 'menu' ? 'active' : ''} 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Menu
              </a>
            </li>
            {/* <li>
              <a 
                href="#chef" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('home');
                  setTimeout(() => {
                    const element = document.getElementById('chef-section');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Our Chef
              </a>
            </li> */}
            <li>
              <a 
                href="#footer" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <button 
              className={`cart-trigger ${isCartBouncing ? 'bounce' : ''}`} 
              onClick={() => { onCartClick(); setIsMobileMenuOpen(false); }}
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-menu animate-fade-in">
            <ul className="mobile-nav-links">
              <li>
                <a 
                  href="#home" 
                  className={activeTab === 'home' ? 'active' : ''} 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('home');
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#menu" 
                  className={activeTab === 'menu' ? 'active' : ''} 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('menu');
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Explore Menu
                </a>
              </li>
              <li>
                <a 
                  href="#chef" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('home');
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('chef-section');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Meet Chef
                </a>
              </li>
              <li>
                <a 
                  href="#footer" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('contact-section');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
  );
}
