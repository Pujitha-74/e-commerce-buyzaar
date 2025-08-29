import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Filter, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const Header = ({ cartCount, onCartClick, onSearch, onCategoryFilter, categories = [], products = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Debug logging for categories
  useEffect(() => {
    console.log('Header received categories:', categories);
    console.log('Header received products:', products);
  }, [categories, products]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProductClick = (product) => {
    setShowResults(false);
    setSearchQuery('');
    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate to product page
    navigate(`/product/${product._id}`);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      if (onSearch) {
        onSearch('');
      }
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      // Perform local search on products array
      const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.category && product.category.name.toLowerCase().includes(query))
        );
      });

      setSearchResults(filteredProducts);

      // Also call parent search function if provided
      if (onSearch) {
        await onSearch(searchQuery);
      }

      // Simulate search delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setShowResults(false);
    
    if (onCategoryFilter) {
      try {
        await onCategoryFilter(categoryId);
        // Scroll to products section smoothly with a slight delay to ensure DOM is updated
        setTimeout(() => {
          const productsSection = document.getElementById('products-section');
          if (productsSection) {
            productsSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 200);
      } catch (error) {
        console.error('Category filter error:', error);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSearchResults([]);
    setShowResults(false);
    if (onSearch) onSearch('');
    if (onCategoryFilter) onCategoryFilter('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setShowResults(false);
      setSearchResults([]);
    } else {
      // Perform real-time search as user types
      const query = e.target.value.toLowerCase();
      const filteredProducts = products.filter(product => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.category && product.category.name.toLowerCase().includes(query))
        );
      });
      setSearchResults(filteredProducts);
      setShowResults(true);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#0B1426] via-[#1E293B] to-[#0F172A] shadow-2xl sticky top-0 z-50 border-b border-[#334155]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-[#3B82F6]/25 transition-all duration-500 group-hover:scale-110">
              <span className="text-white font-black text-2xl tracking-wider">BZ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white from-[#3B82F6]  bg-clip-text text-transparent tracking-tight">
                BuyZaar
              </span>
              
            </div>
          </Link>

          {/* Search and Filter Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-5 flex-1 max-w-2xl mx-10 search-container">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-white placeholder-s font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-white font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 max-h-96 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-8 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-[#3B82F6] mx-auto mb-4" />
                    <p className="text-grey-700 font-semibold text-lg">Searching products...</p>
                    <p className="text-gray-500 text-sm mt-1">Please wait while we find the best matches</p>
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 tracking-wide">
                        Search Results for "<span className="text-[#3B82F6]">{searchQuery}</span>"
                      </h3>
                      <button
                        onClick={() => setShowResults(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        {searchResults.slice(0, 5).map((product) => (
                          <div 
                            key={product._id} 
                            className="flex items-center space-x-4 p-3 hover:bg-gradient-to-r hover:from-[#3B82F6]/5 hover:to-[#06B6D4]/5 rounded-xl cursor-pointer transition-all duration-200 group"
                            onClick={() => handleProductClick(product)}
                          >
                            <img 
                              src={product.images && product.images[0] ? product.images[0] : '/placeholder-product.jpg'} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-bold text-gray-900 truncate group-hover:text-[#3B82F6] transition-colors duration-200">{product.name}</p>
                              <p className="text-lg font-bold text-[#3B82F6]">${product.price}</p>
                              {product.category && (
                                <p className="text-sm text-gray-500 font-medium">{product.category.name}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        {searchResults.length > 5 && (
                          <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 font-semibold">
                              +{searchResults.length - 5} more amazing products
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-700 font-bold text-xl mb-2">No products found</p>
                        <p className="text-gray-500 font-medium">Try different keywords or browse our categories</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-[#06B6D4] transition-all duration-300 font-bold tracking-wide text-lg hover:scale-105 transform"
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className="text-white hover:text-[#06B6D4] transition-all duration-300 font-bold tracking-wide text-lg hover:scale-105 transform"
            >
              Admin
            </Link>
          </nav>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-3 text-white hover:text-[#06B6D4] transition-all duration-300 group"
          >
            <div className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <ShoppingCart size={26} />
            </div>
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center shadow-2xl font-bold animate-pulse">
                {cartCount}
              </div>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 text-white hover:text-[#06B6D4] transition-all duration-300 group"
          >
            <div className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden py-4 border-t border-[#334155]/30 search-container">
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-gray-900 placeholder-whfont-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
              />
              
              {/* Mobile Search Results */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 max-h-80 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-6 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6] mx-auto mb-3" />
                      <p className="text-gray-700 font-semibold">Searching...</p>
                    </div>
                  ) : searchQuery.trim() ? (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-gray-800 tracking-wide">
                          Results for "<span className="text-[#3B82F6]">{searchQuery}</span>"
                        </h3>
                        <button
                          onClick={() => setShowResults(false)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      {searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.slice(0, 3).map((product) => (
                            <div 
                              key={product._id} 
                              className="flex items-center space-x-3 p-2 hover:bg-gradient-to-r hover:from-[#3B82F6]/5 hover:to-[#06B6D4]/5 rounded-xl cursor-pointer transition-all duration-200 group"
                              onClick={() => handleProductClick(product)}
                            >
                              <img 
                                src={product.images && product.images[0] ? product.images[0] : '/placeholder-product.jpg'} 
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  e.target.src = '/placeholder-product.jpg';
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#3B82F6] transition-colors duration-200">{product.name}</p>
                                <p className="text-sm font-bold text-[#3B82F6]">${product.price}</p>
                                {product.category && (
                                  <p className="text-xs text-gray-500 font-medium">{product.category.name}</p>
                                )}
                              </div>
                            </div>
                          ))}
                          {searchResults.length > 3 && (
                            <div className="text-center pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-600 font-semibold">
                                +{searchResults.length - 3} more products
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-600 font-bold">No products found</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-5 py-3 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#8B5CF6] text-white rounded-2xl hover:from-[#2563EB] hover:via-[#0891B2] hover:to-[#7C3AED] transition-all duration-300 font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Category Filter */}
          <div className="flex items-center space-x-3 mt-3">
            <div className="relative flex-1 group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#64748B] group-hover:text-[#3B82F6] transition-colors duration-300" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white/10 border-2 border-[#475569]/50 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all duration-300 appearance-none font-medium tracking-wide backdrop-blur-sm group-hover:border-[#3B82F6]/50"
              >
                <option value="">All Categories</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No categories available</option>
                )}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#64748B] group-hover:text-[#3B82F6] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold tracking-wide rounded-2xl border border-[#475569]/30 hover:border-[#3B82F6]/50"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-[#334155]/30 bg-[#1E293B]/95 backdrop-blur-xl">
              <nav className="py-6 space-y-4">
                <Link 
                  to="/" 
                  className="block text-white hover:text-[#06B6D4] transition-all duration-300 font-bold tracking-wide text-lg px-6 hover:bg-white/10 hover:scale-105 transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/admin" 
                  className="block text-white hover:text-[#06B6D4] transition-all duration-300 font-bold tracking-wide text-lg px-6 hover:bg-white/10 hover:scale-105 transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              </nav>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
