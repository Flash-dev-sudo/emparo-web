export default function GallerySection() {
  const galleryImages = [
    {
      src: "/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png",
      alt: "Flame-Grilled Peri Peri Chicken",
      title: "Flame-Grilled Perfection"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 07_40_16 PM.png",
      alt: "Juicy Peri Peri Half Chicken",
      title: "Authentic Peri Peri"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png",
      alt: "Peri Peri Chicken Burger",
      title: "Signature Burgers"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 08_27_31 PM.png",
      alt: "Double Peri Peri Burger",
      title: "Double the Flavor"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png",
      alt: "Spicy Chicken Wings",
      title: "Hot Wings"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 10_10_13 PM.png",
      alt: "Peri Peri Seasoned Fries",
      title: "Signature Sides"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 10_18_07 PM.png",
      alt: "Loaded Peri Fries",
      title: "Loaded Goodness"
    },
    {
      src: "/images/ChatGPT Image May 22, 2025, 10_21_07 PM.png",
      alt: "Emparo Signature Shake",
      title: "Cool Refreshment"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emparo-orange rounded-full mb-6">
            <i className="fas fa-camera text-white text-2xl"></i>
          </div>
          <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-4">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A visual feast of our flame-grilled creations
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg card-hover cursor-pointer group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-bold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
