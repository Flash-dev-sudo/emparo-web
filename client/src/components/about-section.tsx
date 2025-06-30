export default function AboutSection() {
  const values = [
    {
      icon: "fas fa-fire",
      title: "Authentic Flavors",
      description: "Traditional recipes with genuine peri peri spices"
    },
    {
      icon: "fas fa-leaf",
      title: "Fresh Ingredients",
      description: "Only the finest, freshest ingredients make it to your plate"
    },
    {
      icon: "fas fa-users",
      title: "Family Tradition",
      description: "Recipes passed down through generations"
    },
    {
      icon: "fas fa-award",
      title: "Quality Promise",
      description: "Committed to excellence in every meal"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emparo-orange rounded-full mb-6">
              <i className="fas fa-heart text-white text-2xl"></i>
            </div>
            <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-6 leading-tight">
              Our Story
            </h2>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed font-medium">
              Located in the heart of Finsbury Park at 24 Blackstock Road, Emparo Peri Peri brings you the finest in authentic flame-grilled cuisine. Our journey began with a simple mission: to share the bold, fiery flavors of peri peri with London food lovers.
            </p>
            <p className="text-lg text-gray-800 mb-8 leading-relaxed font-medium">
              <strong className="text-emparo-black font-bold">Marinated for twenty-four hours, steam cooked, grilled to order.</strong> This is the secret behind our chicken. However, we also do so much more, including beef burgers made from 99% British and Irish beef. Every dish is crafted with care using only the freshest ingredients.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emparo-orange rounded-full flex items-center justify-center">
                    <i className={`${value.icon} text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-emparo-black mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-800 font-medium leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-emparo-orange text-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <i className="fas fa-map-marker-alt text-3xl"></i>
                </div>
                <div className="font-bold text-xl mb-2">Visit Us</div>
                <div className="text-lg">24 Blackstock Road</div>
                <div className="text-lg">Finsbury Park, London</div>
                <div className="text-lg">N4 2DW</div>
              </div>
            </div>
            <div className="bg-white text-emparo-black p-8 rounded-2xl shadow-xl border-2 border-emparo-orange">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <i className="fas fa-clock text-emparo-orange text-3xl"></i>
                </div>
                <div className="font-bold text-xl mb-2 text-emparo-orange">Opening Hours</div>
                <div className="text-lg font-semibold">Monday - Sunday</div>
                <div className="text-lg">1:00 PM - 4:00 AM</div>
                <div className="text-sm text-gray-600 mt-2">Late night dining available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
