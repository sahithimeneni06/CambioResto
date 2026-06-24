import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import ThreeDViewer from './ThreeDViewer';

export default function ThreeDModal({ isOpen, onClose, item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustom, setSelectedCustom] = useState('');

  // Reset local states when item changes or modal opens
  useEffect(() => {
    if (item) {
      setQuantity(1);
      // Set default customization option
      if (item.customizations && item.customizations.options) {
        setSelectedCustom(item.customizations.options[0]);
      } else {
        setSelectedCustom('');
      }
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    // Add item to cart with customizations
    const customLabel = selectedCustom ? `${item.customizations.type}: ${selectedCustom}` : 'standard preparation';
    onAddToCart(item, quantity, customLabel);
    onClose();
  };

  const getTagClass = (tag) => {
    switch (tag) {
      case 'veg': return 'veg';
      case 'non-veg': return 'non-veg';
      default: return 'other';
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left Column - 3D/360 Canvas Viewer */}
        <ThreeDViewer item={item} />

        {/* Right Column - Ordering & Customization */}
        <div className="modal-details">
          <span className="modal-details-tag">{item.category}</span>
          <h2 className="modal-details-title">{item.name}</h2>
          
          <div className="modal-details-price">
            ${item.price.toFixed(2)}
          </div>

          <p className="modal-details-desc">{item.description}</p>

          {/* Customization Options */}
          {item.customizations && (
            <div className="customization-section">
              <h3 className="custom-title">{item.customizations.type}</h3>
              <div className="custom-options">
                {item.customizations.options.map(option => (
                  <button
                    key={option}
                    className={`custom-option-btn ${selectedCustom === option ? 'active' : ''}`}
                    onClick={() => setSelectedCustom(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Order Actions */}
          <div className="modal-actions">
            <div className="modal-quantity">
              <button 
                className="modal-qty-btn" 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="modal-qty-val">{quantity}</span>
              <button 
                className="modal-qty-btn" 
                onClick={() => setQuantity(prev => prev + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button className="btn-gold btn-modal-add" onClick={handleAddToCart}>
              <ShoppingBag size={18} /> Add to Order - ${(item.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
