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
            <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded with a passion for authentic flame-grilled cuisine, Emparo Peri Peri brings you the finest in African-Portuguese culinary tradition. Our journey began with a simple mission: to share the bold, fiery flavors of peri peri with food lovers everywhere.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Every dish is crafted with care, using only the freshest ingredients and our signature peri peri spice blend that's been perfected over generations. From our flame-grilled chicken to our zesty sides, we ensure every bite delivers an unforgettable experience.
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
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
              alt="Restaurant Team Preparing Food"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-emparo-orange text-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="font-bold text-3xl">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white text-emparo-black p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="font-bold text-3xl text-emparo-orange">1000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
