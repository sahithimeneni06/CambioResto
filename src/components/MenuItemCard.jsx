import React from 'react';
import { Plus, Rotate3d, Eye } from 'lucide-react';

export default function MenuItemCard({ item, onAddToCart, onOpen3D }) {
  const getTagClass = (tag) => {
    switch (tag) {
      case 'veg': return 'veg';
      case 'non-veg': return 'non-veg';
      default: return 'other';
    }
  };

  const getTagLabel = (tag) => {
    switch (tag) {
      case 'veg': return 'Veg';
      case 'non-veg': return 'Non-Veg';
      case 'dessert': return 'Dessert';
      case 'beverages': return 'Drink';
      default: return 'Bakery';
    }
  };

  return (
    <div className="menu-card">
      <div className="menu-card-image">
        <span className={`menu-tag ${getTagClass(item.tag)}`}>
          {getTagLabel(item.tag)}
        </span>
        
        {/* Interactive 3D quick badge */}
        <button 
          className="menu-threed-badge" 
          onClick={() => onOpen3D(item)} 
          title="Interactive 3D View"
        >
          <Rotate3d size={18} />
        </button>

        <img src={item.image} alt={item.name} loading="lazy" />
      </div>

      <div className="menu-card-content">
        <div className="menu-item-header">
          <h3 className="menu-item-title">{item.name}</h3>
          <span className="menu-item-price">${item.price.toFixed(2)}</span>
        </div>
        <p className="menu-item-desc">{item.description}</p>
        
        <div className="menu-card-actions">
          <button 
            className="btn-card-view" 
            onClick={() => onOpen3D(item)}
          >
            <Eye size={14} /> 3D View
          </button>
          
          <button 
            className="btn-card-add" 
            onClick={() => onAddToCart(item)}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
