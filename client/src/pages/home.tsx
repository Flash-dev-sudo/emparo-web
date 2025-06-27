import { useState } from 'react';
import Navigation from '@/components/navigation';
import CartOverlay from '@/components/cart-overlay';
import HeroSection from '@/components/hero-section';
import FeaturedDishes from '@/components/featured-dishes';
import GallerySection from '@/components/gallery-section';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="smooth-scroll">
      <Navigation onCartToggle={() => setIsCartOpen(true)} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <HeroSection />
      <FeaturedDishes />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
