import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import CartModal from './components/modals/CartModal';
import { productAPI, categoryAPI } from './services/api';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fallback categories in case API fails
  const fallbackCategories = [
    { _id: 'electronics', name: 'Electronics' },
    { _id: 'sports', name: 'Sports' },
    { _id: 'fashion', name: 'Fashion' },
    { _id: 'home', name: 'Home & Garden' },
    { _id: 'books', name: 'Books' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const [productsData, categoriesData] = await Promise.all([
        productAPI.getAll(),
        categoryAPI.getAll()
      ]);
      
      console.log('Products data:', productsData);
      console.log('Categories data:', categoriesData);
      
      setProducts(productsData.products || []);
      setFilteredProducts(productsData.products || []);
      
      // Use API categories if available, otherwise use fallback
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData);
        console.log('Using API categories:', categoriesData.length);
      } else {
        setCategories(fallbackCategories);
        console.log('Using fallback categories:', fallbackCategories.length);
      }
      
      console.log('State updated - Products:', productsData.products?.length || 0);
      console.log('State updated - Categories:', categoriesData?.length || fallbackCategories.length);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set fallback data on error
      setProducts([]);
      setFilteredProducts([]);
      setCategories(fallbackCategories);
      console.log('Error occurred, using fallback categories');
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      const searchResults = await productAPI.search(query);
      setFilteredProducts(searchResults || []);
    } catch (error) {
      console.error('Error searching products:', error);
      // Fallback to local search if API fails
      const localResults = products.filter(product => {
        const searchQuery = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery) ||
          (product.category && product.category.name.toLowerCase().includes(searchQuery))
        );
      });
      setFilteredProducts(localResults);
    }
  };

  const handleCategoryFilter = async (categoryId) => {
    if (!categoryId) {
      setFilteredProducts(products);
      return;
    }

    try {
      const categoryProducts = await productAPI.getByCategory(categoryId);
      setFilteredProducts(categoryProducts || []);
    } catch (error) {
      console.error('Error filtering by category:', error);
      // Fallback to local filter if API fails
      const localResults = products.filter(product => 
        product.category && product.category._id === categoryId
      );
      setFilteredProducts(localResults);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <Router>
      <div className="App bg-[#d2f5fc] min-h-screen">
        <Header
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          categories={categories}
          products={products}
        />

        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} products={filteredProducts} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          total={cartTotal}
        />
      </div>
    </Router>
  );
}

export default App;
