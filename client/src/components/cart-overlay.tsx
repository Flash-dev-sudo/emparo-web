import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartOverlay({ isOpen, onClose }: CartOverlayProps) {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  console.log('CartOverlay: cart state:', cart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-bold text-xl">Your Order</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-emparo-orange"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <i className="fas fa-shopping-cart text-4xl mb-4"></i>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-emparo-black">
                        {item.name}
                      </h4>
                      <p className="text-emparo-orange font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-emparo-orange text-white rounded-full flex items-center justify-center"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-xl text-emparo-orange">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <Button className="w-full bg-emparo-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
