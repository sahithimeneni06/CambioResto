import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid } from 'lucide-react';
import { menuCategories, menuItems } from '../data/menuData';
import MenuItemCard from './MenuItemCard';

export default function Menu({ onAddToCart, onOpen3D }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...menuItems];

    // 1. Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    // 3. Sort items
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div id="menu">
      {/* Menu Banner */}
      <section className="menu-page-header">
        <div className="container">
          <span className="section-subtitle">Exquisite Selection</span>
          <h1 className="section-title" style={{ color: 'var(--text-primary)' }}>Our Culinary Menu</h1>
        </div>
      </section>

      {/* Menu Workspace */}
      <section className="menu-container container">
        {/* Search, Filter & Sort Panel */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '24px', 
            marginBottom: '40px',
            flexWrap: 'wrap',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-muted)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          {/* Search bar */}
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-muted)' 
              }} 
            />
            <input 
              type="text" 
              placeholder="Search dishes or ingredients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px 12px 42px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                transition: 'var(--transition-fast)'
              }}
              className="search-input"
            />
          </div>

          {/* Sort selection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <SlidersHorizontal size={16} style={{ color: 'var(--color-gold)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-gold)',
                color: 'var(--text-primary)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="menu-categories">
          {menuCategories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="menu-grid">
            {filteredAndSortedItems.map(item => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                onAddToCart={onAddToCart}
                onOpen3D={onOpen3D}
              />
            ))}
          </div>
        ) : (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '60px 0', 
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-muted)' 
            }}
          >
            <Grid size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>No menu items found</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Try adjusting your search query or filter category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
