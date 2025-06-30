import RoosterLogo from './rooster-logo';
import chickenImage from '@assets/peri/ChatGPT Image May 22, 2025, 10_10_13 PM.png';
import pizzaImage from '@assets/peri/enhanced_pizza.jpg';
import grilledChickenImage from '@assets/peri/ChatGPT Image May 22, 2025, 07_35_09 PM.png';

export default function HeroSection() {
  const scrollToFeatured = () => {
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-600 via-emparo-orange to-red-600"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full py-20">
          
          {/* Left Content - 6 columns */}
          <div className="lg:col-span-6 space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <RoosterLogo className="text-emparo-orange" size={32} />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">EMPARO</h2>
                <p className="text-yellow-200 text-sm">Peri Peri</p>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-yellow-300 leading-none tracking-tight drop-shadow-lg">
                PERI<br/>PERI
              </h1>
              <div className="w-20 h-1 bg-yellow-300 rounded-full shadow-lg"></div>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-md">
                Authentic flame-grilled chicken & stone-baked specialties
              </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-black/95 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-lg shadow-2xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-yellow-300 text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    Authentic Grilled Chicken
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed font-medium">
                    Experience the authentic taste of flame-grilled peri peri chicken, 
                    fresh stone-baked pizzas, and mouth-watering specialties.
                  </p>
                </div>
                
                {/* Location & Hours */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-map-marker-alt text-emparo-orange mt-1 text-lg"></i>
                    <div>
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-gray-300 text-sm">24 Blackstock Rd, Finsbury Park, N4 2DW</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-clock text-emparo-orange mt-1 text-lg"></i>
                    <div>
                      <p className="text-white font-semibold">Hours</p>
                      <p className="text-gray-300 text-sm">Daily 1:00 PM - 4:00 AM</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-white font-semibold mb-3">Our Specialties</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-fire text-emparo-orange w-5"></i>
                      <span className="text-gray-200">Flame-grilled to perfection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-drumstick-bite text-emparo-orange w-5"></i>
                      <span className="text-gray-200">24-hour marinated chicken</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-pepper-hot text-emparo-orange w-5"></i>
                      <span className="text-gray-200">Signature peri peri spices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="/order"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-3xl border border-blue-500/20"
              >
                <i className="fas fa-utensils text-xl"></i>
                <span>View Our Menu</span>
              </a>
              <a
                href="tel:02034416940"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-3xl border border-yellow-400/30"
              >
                <i className="fas fa-phone text-xl"></i>
                <span>020 3441 6940</span>
              </a>
            </div>
          </div>

          {/* Right Content - Food Images Grid - 6 columns */}
          <div className="lg:col-span-6 relative">
            {/* Main featured image */}
            <div className="relative z-10">
              <div className="w-full max-w-lg mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
                    <img
                      src={chickenImage}
                      alt="Authentic Emparo grilled chicken"
                      className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-white text-xl md:text-2xl font-bold mb-2 leading-tight">Signature Grilled Chicken</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">Marinated in authentic peri peri spices for 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary images */}
            <div className="grid grid-cols-2 gap-6 mt-8 px-4">
              <div className="relative group">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                  <img
                    src={pizzaImage}
                    alt="Stone-baked pizza"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-bold">Stone-Baked Pizza</p>
                    <p className="text-gray-400 text-xs">Fresh ingredients daily</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                  <img
                    src={grilledChickenImage}
                    alt="Peri peri specialties"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-bold">Fresh Specialties</p>
                    <p className="text-gray-400 text-xs">Grilled to perfection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating rooster logo */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-emparo-orange to-red-600 rounded-full flex items-center justify-center shadow-2xl z-20 border-2 border-white/20">
              <RoosterLogo className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <button onClick={scrollToFeatured} className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Explore Menu</span>
          <i className="fas fa-chevron-down text-xl"></i>
        </button>
      </div>
    </section>
  );
}
