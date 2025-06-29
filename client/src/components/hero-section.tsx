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
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-yellow-300 leading-none tracking-tight drop-shadow-lg">
                PERI<br/>PERI
              </h1>
              <div className="w-24 h-2 bg-yellow-300 rounded-full"></div>
            </div>

            {/* Main Content Card */}
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md">
              <div className="space-y-6">
                <div>
                  <h3 className="text-yellow-300 text-2xl font-bold mb-2">
                    Authentic Grilled Chicken
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Authentic Grilled Chicken & Peri Peri Specialties
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-sm"></i>
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">4.9/5 Customer Rating</span>
                </div>

                {/* Features */}
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-fire text-emparo-orange"></i>
                    <span>Flame-grilled to perfection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clock text-emparo-orange"></i>
                    <span>24-hour marinated chicken</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-pepper-hot text-emparo-orange"></i>
                    <span>Signature peri peri spices</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/order"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <i className="fas fa-utensils"></i>
                <span>View Our Menu</span>
              </a>
              <a
                href="tel:02034416940"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <i className="fas fa-phone"></i>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <img
                      src={chickenImage}
                      alt="Authentic Emparo grilled chicken"
                      className="w-full h-80 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white text-xl font-bold">Signature Grilled Chicken</h4>
                      <p className="text-gray-300 text-sm">Marinated in authentic peri peri spices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary images */}
            <div className="grid grid-cols-2 gap-4 mt-6 px-8">
              <div className="relative group">
                <div className="bg-black rounded-2xl overflow-hidden shadow-lg border-2 border-white/10">
                  <img
                    src={pizzaImage}
                    alt="Stone-baked pizza"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-2">
                    <p className="text-white text-sm font-semibold">Stone-Baked Pizza</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-black rounded-2xl overflow-hidden shadow-lg border-2 border-white/10">
                  <img
                    src={grilledChickenImage}
                    alt="Peri peri specialties"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-2">
                    <p className="text-white text-sm font-semibold">Fresh Specialties</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating rooster logo */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-emparo-orange rounded-full flex items-center justify-center shadow-2xl z-20 animate-pulse">
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
