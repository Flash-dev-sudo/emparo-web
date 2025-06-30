import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MenuItem, MenuCategory } from '@/types/menu';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const getImageForCategory = (category: string, id: number) => {
    const imageMap: { [key: string]: string[] } = {
      'Starters': [
        '/images/ChatGPT Image May 22, 2025, 10_10_13 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_18_07 PM.png'
      ],
      'Platters': [
        '/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png',
        '/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png'
      ],
      'Fried Chicken': [
        '/images/ChatGPT Image May 22, 2025, 07_40_16 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_02_17 PM.png',
        '/images/ChatGPT Image May 22, 2025, 10_07_25 PM.png'
      ],
      'Pizzas': [
        '/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png',
        '/images/ChatGPT Image May 22, 2025, 08_27_31 PM.png'
      ],
      'Mains': [
        '/images/ChatGPT Image May 22, 2025, 07_51_37 PM.png',
        '/images/ChatGPT Image May 22, 2025, 09_20_56 PM.png',
        '/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png'
      ]
    };

    const images = imageMap[category] || imageMap['Mains'];
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
      image: getImageForCategory(item.category, item.id),
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart`,
      duration: 2000,
    });
  };

  const getHeatLevelIcons = (level: number | null) => {
    const heatLevel = level || 1;
    return Array.from({ length: heatLevel }, (_, i) => (
      <i key={i} className="fas fa-fire text-sm text-emparo-orange"></i>
    ));
  };

  // Get unique categories from the actual menu data
  const uniqueCategories: string[] = [];
  if (menuItems) {
    menuItems.forEach(item => {
      if (!uniqueCategories.includes(item.category)) {
        uniqueCategories.push(item.category);
      }
    });
  }
  
  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All Items' },
    ...uniqueCategories.map(category => ({
      key: category,
      label: category
    }))
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
          <h2 className="font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
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

        {/* Menu Items List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-utensils text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 text-lg">No menu items available in this category.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-2xl text-gray-900 leading-tight pr-4">
                          {item.name}
                        </h3>
                        <span className="bg-emparo-orange text-white px-4 py-2 rounded-full text-lg font-bold flex-shrink-0">
                          £{item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed mb-4 max-w-3xl font-medium">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(item.heatLevel || 1, 5) }, (_, i) => (
                            <i key={i} className="fas fa-fire text-sm text-emparo-orange"></i>
                          ))}
                          <span className="text-sm text-gray-800 ml-1 font-semibold">
                            {(item.heatLevel || 1) === 1 && 'Mild'}
                            {(item.heatLevel || 1) === 2 && 'Medium'}
                            {(item.heatLevel || 1) === 3 && 'Hot'}
                            {(item.heatLevel || 1) >= 4 && 'Extra Hot'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Button */}
                    <div className="flex-shrink-0 sm:ml-4">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-emparo-orange hover:bg-emparo-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md w-full sm:w-auto"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Add to Cart
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
