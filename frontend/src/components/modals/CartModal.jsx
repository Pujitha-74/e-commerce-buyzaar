import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 9.99; // Free shipping over $100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutStep(2);
    
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutStep(3);
      setTimeout(() => {
        onClose();
        setIsCheckingOut(false);
        setCheckoutStep(1);
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#E2E8F0]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#0B1426] to-[#1E293B] border-b border-[#334155] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                  <p className="text-sm text-[#F1F5F9]">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#F1F5F9] hover:text-white transition-colors rounded-lg hover:bg-[#334155]"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-12 h-12 text-[#64748B]" />
                </div>
                <h3 className="text-lg font-medium text-[#334155] mb-2">Your cart is empty</h3>
                <p className="text-[#64748B] mb-6">Add some products to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center gap-4 p-4 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]"
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2 bg-[#3B82F6] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#334155] truncate">{item.name}</h4>
                      <p className="text-sm text-[#64748B] truncate">
                        {item.category?.name || 'Category'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-[#3B82F6]">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-[#64748B] line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item._id || index, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-full hover:bg-[#E2E8F0] transition-colors text-[#64748B] hover:text-[#334155]"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-[#334155]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id || index, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-[#E2E8F0] transition-colors text-[#64748B] hover:text-[#334155]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item._id || index)}
                      className="p-2 text-[#EF4444] hover:text-[#DC2626] hover:bg-[#EF4444]/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#E2E8F0] p-6 space-y-4 bg-[#F8FAFC]">
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Subtotal</span>
                  <span className="font-medium text-[#334155]">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Tax (8%)</span>
                  <span className="font-medium text-[#334155]">${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Shipping</span>
                  <span className="font-medium text-[#334155]">
                    {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#E2E8F0] pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#334155]">Total</span>
                    <span className="text-[#3B82F6]">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-4 px-6 rounded-xl font-semibold hover:from-[#2563EB] hover:to-[#0891B2] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full text-[#64748B] hover:text-[#334155] transition-colors py-2"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {/* Checkout Success Overlay */}
          <AnimatePresence>
            {checkoutStep === 3 && (
              <div
                className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-2xl"
              >
                <div className="text-center">
                  <div
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Order Placed Successfully!
                  </h3>
                  <p
                    className="text-gray-600"
                  >
                    Thank you for your purchase. You'll receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CartModal;
