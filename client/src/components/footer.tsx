import RoosterLogo from './rooster-logo';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', target: 'home' },
    { label: 'Menu', target: 'menu' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-youtube", href: "#" }
  ];

  return (
    <footer className="bg-emparo-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-emparo-orange rounded-full flex items-center justify-center">
                <RoosterLogo className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-bold text-2xl">Emparo</h1>
                <p className="text-sm text-gray-400">Peri Peri</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Experience the authentic taste of flame-grilled perfection with our
              signature peri peri spices. Quality food, unforgettable flavors.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-emparo-orange transition-colors duration-200"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="text-gray-400 hover:text-emparo-orange transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <i className="fas fa-phone mr-2 text-emparo-orange"></i>
                020 3441 6940
              </p>
              <p>
                <i className="fas fa-envelope mr-2 text-emparo-orange"></i>
                hello@emparoperiperi.com
              </p>
              <p>
                <i className="fas fa-map-marker-alt mr-2 text-emparo-orange"></i>
                24 Blackstock Rd, Finsbury Park
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Emparo Peri Peri. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
