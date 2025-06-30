import { useQuery } from '@tanstack/react-query';
import { type MenuItem } from '@/types/menu';
import RoosterLogo from './rooster-logo';

export default function FeaturedDishes() {
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  if (isLoading) {
    return (
      <section id="featured" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emparo-orange"></div>
            <p className="mt-4 text-gray-600">Loading featured dishes...</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredItems = [
    {
      id: 1,
      title: "Authentic Grilled Chicken",
      subtitle: "Flame-grilled perfection marinated for 24 hours",
      description: "Experience the authentic taste of flame-grilled peri peri chicken, marinated for twenty-four hours, steam cooked, and grilled to order. This is the secret behind our signature dishes.",
      image: "/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png",

    },
    {
      id: 2,
      title: "Popular Menu Items",
      subtitle: "Discover our most loved dishes, made fresh daily with authentic flavors",
      items: menuItems && Array.isArray(menuItems) ? [
        {
          name: menuItems.find((item: MenuItem) => item.category === "Fried Chicken")?.name || "Fried Chicken Burger",
          description: menuItems.find((item: MenuItem) => item.category === "Fried Chicken")?.description || "Crispy fried chicken breast in a brioche bun with salad",
          image: "/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png"
        },
        {
          name: menuItems.find((item: MenuItem) => item.category === "Mains")?.name || "Grilled Chicken Breast",
          description: menuItems.find((item: MenuItem) => item.category === "Mains")?.description || "Tender grilled chicken breast marinated in peri peri spices",
          image: "/images/ChatGPT Image May 22, 2025, 09_20_56 PM.png"
        },
        {
          name: menuItems.find((item: MenuItem) => item.category === "Platters")?.name || "Family Platter",
          description: menuItems.find((item: MenuItem) => item.category === "Platters")?.description || "Perfect for sharing - mixed chicken, chips, salad and bread",
          image: "/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png"
        }
      ] : [
        {
          name: "Peri Peri Chicken Burger",
          description: "Grilled chicken breast with lettuce, tomato, and signature peri peri mayo",
          image: "/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png"
        },
        {
          name: "Peri Peri Chicken Wrap",
          description: "Grilled chicken strips with fresh salad and peri peri sauce",
          image: "/images/ChatGPT Image May 22, 2025, 09_20_56 PM.png"
        },
        {
          name: "Peri Peri Chicken Wings",
          description: "Succulent wings marinated and grilled with your choice of spice level",
          image: "/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png"
        }
      ]
    }
  ];

  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Featured Item */}
        <div className="bg-gradient-to-r from-emparo-orange to-orange-600 rounded-3xl overflow-hidden mb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[500px]">
            <div className="p-8 lg:p-12 text-white">

              
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
                <RoosterLogo className="text-emparo-orange" size={24} />
              </div>
              
              <h2 className="on-orange-bg text-3xl md:text-4xl mb-4 leading-tight">
                {featuredItems[0].title}
              </h2>
              <p className="on-orange-bg text-xl mb-6 leading-relaxed">
                {featuredItems[0].subtitle}
              </p>
              <p className="on-orange-bg-light mb-8 leading-relaxed text-lg">
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
          <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-6 leading-tight">
            Popular <span className="text-emparo-orange">Menu Items</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {featuredItems[1].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems[1].items?.map((item, index) => (
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
                <h3 className="font-bold text-xl text-emparo-black mb-3 leading-tight">
                  {item.name}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
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