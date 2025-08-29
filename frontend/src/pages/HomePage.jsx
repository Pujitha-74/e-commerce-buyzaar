import { useNavigate } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import HeroSection from '../components/HeroSection';

const HomePage = ({ products = [] }) => {
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="min-h-screen bg-[#d2f5fc]">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Products Section */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#334155] mb-3">Discover Amazing Products</h2>
          <p className="text-[#64748B] text-lg">Explore our curated collection of premium items</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <div key={product._id} className="group relative bg-gradient-to-br from-white via-[#f8fafc] to-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#E2E8F0] hover:border-[#3B82F6]/30">
              {/* Product Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd]">
                <img
                  src={product.images && product.images[0] ? product.images[0] : '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                    {product.category?.name || 'Category'}
                  </div>
                </div>

                {/* Stock Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm ${
                    product.stock > 10 ? 'bg-gradient-to-r from-[#10B981] to-[#059669]' : 
                    product.stock > 0 ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]' : 'bg-gradient-to-r from-[#EF4444] to-[#DC2626]'
                  }`}>
                    {product.stock > 10 ? `✓ In Stock` : 
                     product.stock > 0 ? `⚠ Low Stock` : '✗ Out of Stock'}
                  </div>
                </div>

                {/* Quick View Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(product);
                    }}
                    className="p-2.5 rounded-full shadow-lg backdrop-blur-sm bg-white/90 text-[#334155] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Eye size={18} />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                    <div className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                {/* Rating Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating || 0)
                            ? 'text-[#F59E0B] fill-current' 
                            : 'text-[#E2E8F0]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#64748B]">
                    ({product.numReviews || 0})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-base font-bold text-[#334155] line-clamp-2 group-hover:text-[#3B82F6] transition-colors duration-300 leading-tight">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-[#64748B] text-xs line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#64748B] line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.originalPrice && (
                    <div className="inline-flex items-center gap-1.5 bg-[#EF4444]/10 text-[#EF4444] px-2 py-1 rounded-full text-xs font-medium border border-[#EF4444]/20">
                      <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full"></span>
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(product);
                  }}
                  className="w-full bg-gradient-to-r from-[#F1F5F9] to-[#E2E8F0] text-[#334155] py-2.5 px-4 rounded-xl font-semibold hover:from-[#3B82F6]/10 hover:to-[#06B6D4]/10 hover:text-[#3B82F6] transition-all duration-300 flex items-center justify-center gap-2 border border-[#E2E8F0] hover:border-[#3B82F6]/30 group/btn"
                >
                  <Eye size={18} className="group-hover/btn:animate-pulse" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">No products available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;