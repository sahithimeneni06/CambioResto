import React, { useEffect, useState } from 'react';
import { Compass, ShieldCheck, Heart, Award, ChevronRight } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after mounting
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="home">
      {/* Hero Banner Section */}
      <section className="hero">
        <div className="container">
          <div className={`hero-content ${animate ? 'animate-slide-up' : ''}`} style={{ opacity: animate ? 1 : 0 }}>
            <span className="hero-subtitle">Authentic Fine Dining</span>
            <h1 className="hero-title">
              Savor the Art of <br />
              <span>Modern Gastronomy</span>
            </h1>
            <p className="hero-description">
              Welcome to Cambio Restaurant, where we fuse time-honored Mediterranean traditions with visionary contemporary culinary techniques. Every bite is an experience.
            </p>
            <div className="hero-buttons">
              <button className="btn-gold" onClick={() => setActiveTab('menu')}>
                Explore Menu <ChevronRight size={16} />
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title">Our Culinary Philosophy</h2>
          </div>
          
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Heart size={28} />
              </div>
              <h3 className="feature-card-title">Crafted with Passion</h3>
              <p className="feature-card-desc">
                Our dishes are designed by visionary chefs who treat every plate as a canvas, selecting ingredient combinations that tell a culinary story.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={28} />
              </div>
              <h3 className="feature-card-title">Authentic Ingredients</h3>
              <p className="feature-card-desc">
                We partner with organic, local farms and import select heirloom ingredients directly from Italy and Greece to ensure absolute authenticity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Award size={28} />
              </div>
              <h3 className="feature-card-title">Vibrant Ambience</h3>
              <p className="feature-card-desc">
                Enjoy your meal in our beautifully designed dining room featuring warm candlelight, custom brass accents, and soft acoustic melodies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Spotlight Section */}
      {/* <section className="chef-highlight" id="chef-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'inherit', gap: 'inherit', alignItems: 'center' }}>
            <div className="chef-image-container">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                alt="Chef Gabriel Cambio" 
              />
              <div className="chef-experience">
                <span>18+</span>
                <label>Years Crafting</label>
              </div>
            </div>

            <div className="chef-info">
              <span className="chef-title">Culinary Mastermind</span>
              <h2>Chef Gabriel Cambio</h2>
              <p className="chef-bio">
                "Gastronomy is the ultimate form of sensory storytelling. At Cambio, we honor the ancestral fire of slow cooking while leveraging modern textures and temperatures to delight the contemporary palette."
              </p>
              <p className="chef-bio" style={{ color: 'var(--text-muted)' }}>
                Before establishing Cambio Restaurant in New York, Chef Gabriel trained in Michelin-starred kitchens across Florence and San Sebastian. His unique focus on wood-fire grilling and house-fermentation techniques has earned Cambio a place in the hearts of food connoisseurs worldwide.
              </p>
              <div className="chef-signature">Gabriel Cambio</div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
