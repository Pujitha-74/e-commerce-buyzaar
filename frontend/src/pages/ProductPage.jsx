import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle,
  Eye,
  Share2,
  Star as StarIcon
} from 'lucide-react';
import { productAPI } from '../services/api';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const productData = await productAPI.getById(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Enhanced Navigation Header */}
      <div className="bg-white shadow-sm border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 text-[#64748B] hover:text-[#3B82F6] transition-colors group"
            >
              <div className="p-2 bg-[#F1F5F9] rounded-lg group-hover:bg-[#3B82F6]/10 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <span className="font-medium">Back to Products</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 size={20} />
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  isLiked
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Enhanced Image Gallery */}
          <div className="space-y-6">
            {/* Main Image Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-yellow-50 p-8">
                {/* Main Image */}
                <div className="relative w-full h-96 flex items-center justify-center">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                  
                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                      >
                        <ChevronLeft size={24} className="text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                      >
                        <ChevronRight size={24} className="text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Category and Stock Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                      {product.category?.name || 'Category'}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                      product.stock > 10 ? 'bg-green-500' : 
                      product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {product.stock > 10 ? '✓ In Stock' : 
                       product.stock > 0 ? '⚠ Low Stock' : '✗ Out of Stock'}
                    </div>
                  </div>

                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-black px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {selectedImage + 1} / {product.images.length}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye size={20} className="text-purple-600" />
                  Product Gallery
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-purple-500/20" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Product Specifications Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle size={20} className="text-purple-600" />
                  Quick Specs
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-medium text-gray-900">{product.category?.name || 'N/A'}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">Stock</span>
                    <p className="font-medium text-gray-900">{product.stock} units</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">Rating</span>
                    <p className="font-medium text-gray-900">{product.rating || 0}/5</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">Reviews</span>
                    <p className="font-medium text-gray-900">{product.numReviews || 0}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Enhanced Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E2E8F0]">
              <div className="space-y-6">
                {/* Category and Stock */}
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-[#3B82F6]/10 text-[#3B82F6] text-sm font-medium rounded-full">
                    {product.category?.name || 'Category'}
                  </span>
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    product.stock > 10 ? 'bg-[#10B981]/10 text-[#10B981]' : 
                    product.stock > 0 ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                  }`}>
                    {product.stock > 10 ? '✓ In Stock' : 
                     product.stock > 0 ? '⚠ Low Stock' : '✗ Out of Stock'}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          size={20}
                          className={`${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {product.rating || 0}
                    </span>
                  </div>
                  <span className="text-gray-600 text-lg">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-bold text-[#3B82F6]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-3xl text-[#64748B] line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {product.originalPrice && (
                    <div className="inline-flex items-center gap-2 bg-[#EF4444]/10 text-[#EF4444] px-4 py-2 rounded-full text-sm font-medium">
                      <CheckCircle size={16} />
                      Save ${(product.originalPrice - product.price).toFixed(2)} 
                      ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart size={24} className="text-[#3B82F6]" />
                Add to Cart
              </h3>
              
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-4 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="px-6 py-3 border-x border-black-300 text-gray-700 text-center min-w-[80px] text-lg font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="px-4 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.stock} available
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-4 px-6 rounded-xl font-semibold hover:from-[#2563EB] hover:to-[#0891B2] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={24} />
                    {product.stock === 0 ? 'Out of Stock' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      isLiked
                        ? 'border-red-500 text-red-500 hover:bg-red-50'
                        : 'border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                <div className="text-xs text-[#64748B]">Over $50</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RotateCcw className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div className="text-sm font-medium text-gray-900">Easy Returns</div>
                <div className="text-xs text-[#64748B]">30 days</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div className="text-sm font-medium text-gray-900">Secure Payment</div>
                <div className="text-xs text-[#64748B]">100% safe</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-[#E2E8F0]">
              <div className="flex">
                {[
                  { id: 'description', label: 'Description', icon: Eye },
                  { id: 'features', label: 'Features', icon: CheckCircle },
                  { id: 'specifications', label: 'Specifications', icon: Star }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-[#3B82F6] border-b-2 border-[#3B82F6] bg-[#3B82F6]/5'
                        : 'text-[#64748B] hover:text-[#334155] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Key Features</h3>
                  {product.features && product.features.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No features listed for this product.</p>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Technical Specifications</h3>
                                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="bg-[#F1F5F9] rounded-xl p-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-[#E2E8F0] last:border-b-0">
                          <dt className="text-sm font-medium text-[#64748B]">{key}</dt>
                          <dd className="text-sm text-[#334155]">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  ) : (
                    <p className="text-gray-500">No specifications available for this product.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
