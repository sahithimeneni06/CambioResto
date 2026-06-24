import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId, elementId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="footer" id="contact-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="footer-logo">
              CAMBIO<span>.</span>
            </div>
            <p className="footer-desc">
              Experience the perfect harmony of culinary heritage and contemporary gastronomy. Every plate tells an authentic story of passion, craft, and flavor.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('home', 'home'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); handleLinkClick('menu', 'menu'); }}>
                  Explore Menu
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="footer-col-title">Hours</h3>
            <ul className="footer-links" style={{ fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={14} className="footer-contact-icon" />
                <div>
                  <strong>Mon - Thu:</strong> 5:00 PM - 10:00 PM
                </div>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={14} className="footer-contact-icon" />
                <div>
                  <strong>Fri - Sat:</strong> 4:00 PM - 11:00 PM
                </div>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={14} className="footer-contact-icon" />
                <div>
                  <strong>Sunday:</strong> 11:30 AM - 9:00 PM
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="footer-col-title">Contact Us</h3>
            <div>
              <div className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon" />
                <span>452 Gastronomy Way, Manhattan, NY 10014</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} className="footer-contact-icon" />
                <span>+1 (212) 555-0198</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} className="footer-contact-icon" />
                <span>reservations@cambiorestaurant.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Cambio Restaurant. All Rights Reserved. Crafted for authentic culinary lovers.</p>
        </div>
      </div>
    </footer>
  );
}
