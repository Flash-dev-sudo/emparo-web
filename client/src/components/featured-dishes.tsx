export default function FeaturedDishes() {
  const featuredItems = [
    {
      id: 1,
      title: "Authentic Grilled Chicken",
      subtitle: "Authentic Grilled Chicken & Peri Peri Specialities",
      description: "Experience the authentic taste of flame-grilled peri peri chicken, fresh stone-baked pizzas, and mouth-watering specialities that will ignite your taste buds.",
      image: "/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png",
      rating: "4.9/5 Customer Rating"
    },
    {
      id: 2,
      title: "Popular Menu Items",
      subtitle: "Discover our most loved dishes, made fresh daily with authentic flavors",
      items: [
        {
          name: "Crispy Chicken Burger",
          description: "Golden crispy chicken with fresh salad and fries",
          image: "/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png"
        },
        {
          name: "Peri Peri Wrap",
          description: "Spicy chicken strips wrapped with fresh vegetables",
          image: "/images/ChatGPT Image May 22, 2025, 09_20_56 PM.png"
        },
        {
          name: "Glazed Peri Wings",
          description: "Perfectly glazed wings with authentic peri peri sauce",
          image: "/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png"
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Featured Item */}
        <div className="bg-gradient-to-r from-emparo-orange to-orange-600 rounded-3xl overflow-hidden mb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[500px]">
            <div className="p-8 lg:p-12 text-white">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-300 mr-3">
                  {[1,2,3,4,5].map(star => (
                    <i key={star} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="text-orange-100">{featuredItems[0].rating}</span>
              </div>
              
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-kiwi-bird text-emparo-orange text-xl"></i>
              </div>
              
              <h2 className="font-bold text-3xl md:text-4xl mb-4">
                {featuredItems[0].title}
              </h2>
              <p className="text-xl mb-6 text-orange-100">
                {featuredItems[0].subtitle}
              </p>
              <p className="text-orange-100 mb-8 leading-relaxed">
                {featuredItems[0].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/order"
                  className="bg-white text-emparo-orange px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
                >
                  <i className="fas fa-utensils mr-2"></i>
                  View Our Menu
                </a>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emparo-orange transition-colors duration-200">
                  Order Now: 020 3441 6940
                </button>
              </div>
            </div>
            
            <div className="relative h-full">
              <img
                src={featuredItems[0].image}
                alt={featuredItems[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                <i className="fas fa-kiwi-bird text-emparo-orange text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Items Grid */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-4">
            Popular <span className="text-emparo-orange">Menu Items</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {featuredItems[1].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems[1].items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-emparo-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-emparo-black mb-3">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <a
                  href="/order"
                  className="inline-flex items-center text-emparo-orange hover:text-orange-600 font-semibold transition-colors duration-200"
                >
                  Order Now
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="/order"
            className="inline-flex items-center bg-emparo-orange text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors duration-200 shadow-xl"
          >
            <i className="fas fa-utensils mr-3"></i>
            Explore Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}