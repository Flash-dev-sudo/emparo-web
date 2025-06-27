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
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg absolute inset-0 z-10"></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "url('https://pixabay.com/get/g2b2bf7d656373ed135f8b48cd46d8c1b74041562a8d3c6096ea79450e1818bb94977d3a18084f42c86d913a7a956290369bbcca27754e6e8b134bef3acc30dad_1280.jpg') center/cover",
          }}
        ></div>
      </div>

      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Rooster Logo */}
        <div className="mb-8 animate-bounce-gentle">
          <div className="w-24 h-24 mx-auto bg-emparo-orange rounded-full flex items-center justify-center shadow-2xl mb-6">
            <i className="fas fa-kiwi-bird text-white text-4xl"></i>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight animate-fade-in">
          Fire-Grilled
          <span className="text-emparo-orange"> Goodness</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed">
          Marinated for twenty-four hours, steam cooked, grilled to order.
          <br className="hidden md:block" />
          Experience flame-grilled perfection with our signature peri peri spices.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <a
            href="/order"
            className="bg-emparo-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <i className="fas fa-utensils mr-2"></i>
            Order Now
          </a>
          <button
            onClick={scrollToFeatured}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-emparo-black transition-all duration-300"
          >
            View Specialties
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </div>
    </section>
  );
}
