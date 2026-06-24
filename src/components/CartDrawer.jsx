import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825; // 8.25% NY sales tax
  const delivery = subtotal > 40 ? 0 : (subtotal > 0 ? 5.00 : 0);
  const grandTotal = subtotal + tax + delivery;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    
    // Simulate payment API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      
      // Fire confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#cda45e', '#b85a3c', '#ffffff', '#48724d']
      });

      // Clear the cart in parent state after delay
      setTimeout(() => {
        onClearCart();
      }, 500);
    }, 1800);
  };

  const handleClose = () => {
    onClose();
    // Reset checkout status after transition completes
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 400);
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={handleClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">
            <ShoppingBag size={22} style={{ color: 'var(--color-gold)' }} /> 
            Your Order 
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </h2>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="cart-items">
          {checkoutSuccess ? (
            /* Success View */
            <div 
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px',
                animation: 'fadeIn 0.5s ease-out'
              }}
            >
              <CheckCircle2 size={64} style={{ color: 'var(--color-gold)', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Order Confirmed!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
                Thank you for dining with Cambio Restaurant. Our chefs are preparing your authentic delicacies.
              </p>
              <div 
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-gold)',
                  width: '100%',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Prep Time:</span>
                  <strong>25 - 35 mins</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Order Type:</span>
                  <strong>Premium Delivery</strong>
                </div>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty View */
            <div className="empty-cart-message">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Browse our exquisite menu categories and select items to build your authentic meal.
              </p>
            </div>
          ) : (
            /* Items List View */
            cartItems.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${item.customization}-${idx}`}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-customization">
                    {item.customization}
                  </div>
                  <div className="cart-item-bottom">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQuantity(item.id, item.customization, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQuantity(item.id, item.customization, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="cart-remove-btn" 
                  onClick={() => onRemoveFromCart(item.id, item.customization)}
                  aria-label="Remove item"
                  style={{ alignSelf: 'flex-start', marginTop: '2px' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Order Summary */}
        {!checkoutSuccess && cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Tax (8.25%)</span>
              <span className="summary-value">${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Delivery Fee</span>
              <span className="summary-value">
                {delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
              </span>
            </div>
            {delivery > 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Add ${(40.00 - subtotal).toFixed(2)} more for FREE delivery.
              </p>
            )}
            
            <div className="summary-row total">
              <span className="summary-label">Total Amount</span>
              <span className="summary-value">${grandTotal.toFixed(2)}</span>
            </div>

            <button 
              className="btn-checkout" 
              onClick={handleCheckout} 
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                'Processing Order...'
              ) : (
                <>Place Delivery Order <ChevronRight size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
