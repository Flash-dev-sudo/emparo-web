import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';

interface NavigationProps {
  onCartToggle: () => void;
}

export default function Navigation({ onCartToggle }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-glass' : 'bg-white'
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emparo-orange rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-kiwi-bird text-white text-xl"></i>
            </div>
            <div>
              <h1 className="font-bold text-xl text-emparo-black">Emparo</h1>
              <p className="text-xs text-gray-600 font-medium">Peri Peri</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="relative bg-emparo-orange text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200 font-medium shadow-lg"
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-emparo-black hover:text-emparo-orange"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-left text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-emparo-black hover:text-emparo-orange transition-colors duration-200 font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
