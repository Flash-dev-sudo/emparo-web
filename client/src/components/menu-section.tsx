import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MenuItem, MenuCategory } from '@/types/menu';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCart();

  const getImageForCategory = (category: string, id: number) => {
    const imageMap: { [key: string]: string[] } = {
      'Grilled Chicken': [
        '/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png',
        '/images/ChatGPT Image May 22, 2025, 07_40_16 PM.png',
        '/images/ChatGPT Image May 22, 2025, 07_51_37 PM.png'
      ],
      'Burgers': [
        '/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png',
        '/images/ChatGPT Image May 22, 2025, 08_27_31 PM.png'
      ],
      'Wings & Strips': [
        '/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_02_17 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_07_25 PM.png'
      ],
      'Wraps': [
        '/images/ChatGPT Image May 22, 2025, 09_20_56 PM.png'
      ],
      'Sides': [
        '/images/ChatGPT Image May 22, 2025, 10_10_13 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_18_07 PM.png'
      ],
      'Drinks': [
        '/images/ChatGPT Image May 22, 2025, 10_21_07 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_24_05 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_24_17 PM.png'
      ]
    };

    const images = imageMap[category] || imageMap['Grilled Chicken'];
    return images[(id - 1) % images.length];
  };

  const {
    data: menuItems = [],
    isLoading,
    error,
  } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      if (activeCategory === 'all') {
        setFilteredItems(menuItems);
      } else {
        setFilteredItems(menuItems.filter(item => item.category === activeCategory));
      }
    }
  }, [menuItems, activeCategory]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const getHeatLevelIcons = (level: number | null) => {
    const heatLevel = level || 1;
    return Array.from({ length: heatLevel }, (_, i) => (
      <i key={i} className="fas fa-fire text-sm text-emparo-orange"></i>
    ));
  };

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'chicken', label: 'Chicken' },
    { key: 'burgers', label: 'Burgers' },
    { key: 'sides', label: 'Sides' },
    { key: 'drinks', label: 'Drinks' },
  ];

  if (error) {
    return (
      <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6">
              <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
            <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-4">
              Menu Unavailable
            </h2>
            <p className="text-xl text-gray-600">
              Sorry, we're having trouble loading our menu. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emparo-orange rounded-full mb-6">
            <i className="fas fa-fire text-white text-2xl"></i>
          </div>
          <h2 className="font-bold text-4xl md:text-5xl text-emparo-black mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our flame-grilled specialties, each crafted with authentic peri peri spices
          </p>
        </div>

        {/* Menu Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === key
                  ? 'bg-emparo-orange text-white'
                  : 'bg-white text-emparo-black hover:bg-emparo-orange hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emparo-orange"></div>
            <p className="mt-4 text-gray-600">Loading delicious menu items...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <i className="fas fa-utensils text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600">No menu items available in this category.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
                >
                  <img
                    src={item.image === "image" ? getImageForCategory(item.category, item.id) : item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-emparo-black">
                        {item.name}
                      </h3>
                      <span className="bg-emparo-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {getHeatLevelIcons(item.heatLevel)}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {item.heatLevel === 1 && 'Mild Heat'}
                          {item.heatLevel === 2 && 'Medium Heat'}
                          {item.heatLevel === 3 && 'Hot'}
                          {item.heatLevel >= 4 && 'Extra Hot'}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-emparo-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                      >
                        <i className="fas fa-plus mr-1"></i>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
