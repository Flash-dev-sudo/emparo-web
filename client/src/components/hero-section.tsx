import RoosterLogo from './rooster-logo';

export default function HeroSection() {
  const scrollToFeatured = () => {
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Orange gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emparo-orange via-orange-500 to-orange-600"></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Large PERI PERI Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-yellow-300 leading-none tracking-wider">
                PERI PERI
              </h1>
            </div>

            {/* Content Card */}
            <div className="bg-black bg-opacity-80 rounded-3xl p-8 space-y-6 max-w-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emparo-orange rounded-full flex items-center justify-center">
                  <RoosterLogo className="text-white" size={20} />
                </div>
                <h2 className="text-yellow-300 text-2xl md:text-3xl font-bold">
                  Authentic Grilled Chicken
                </h2>
              </div>
              
              <p className="text-white text-sm">
                Authentic Grilled Chicken & Peri Peri Specialties
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className="text-white text-sm">4.9/5 Customer Rating</span>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-black bg-opacity-80 rounded-3xl p-8 max-w-lg">
              <p className="text-white leading-relaxed">
                Experience the authentic taste of flame-grilled peri peri chicken, fresh stone-baked pizzas, and mouth-watering specialties that will ignite your taste buds.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToFeatured}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
              >
                <i className="fas fa-utensils"></i>
                <span>View Our Menu</span>
              </button>
              <button
                className="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
              >
                <i className="fas fa-phone"></i>
                <span>Order Now: 020 3441 6940</span>
                <i className="fas fa-star text-yellow-600"></i>
              </button>
            </div>
          </div>

          {/* Right Content - Chicken Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Rooster logo in top right */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-emparo-orange rounded-full flex items-center justify-center shadow-2xl z-10">
                <RoosterLogo className="text-white" size={32} />
              </div>
              
              {/* Main chicken image container */}
              <div className="w-80 h-80 md:w-96 md:h-96 bg-black rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
                  alt="Crispy fried chicken pieces"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
