import { useState } from 'react';
import Navigation from '@/components/navigation';
import CartOverlay from '@/components/cart-overlay';
import MenuSection from '@/components/menu-section';
import Footer from '@/components/footer';

export default function OrderPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="smooth-scroll">
      <Navigation onCartToggle={() => setIsCartOpen(true)} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Order Page Header */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-emparo-orange to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
            <i className="fas fa-utensils text-emparo-orange text-2xl"></i>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl text-white mb-4">
            Order Menu
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Browse our authentic peri peri dishes and add your favorites to the cart
          </p>
        </div>
      </section>

      <MenuSection />
      <Footer />
    </div>
  );
}