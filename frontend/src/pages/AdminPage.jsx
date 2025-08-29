import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { productAPI, orderAPI, categoryAPI } from '../services/api';
import AddProductModal from '../components/modals/AddProductModal';
import EditProductModal from '../components/modals/EditProductModal';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData, categoriesData, statsData] = await Promise.all([
        productAPI.getAll(),
        orderAPI.getAll(),
        categoryAPI.getAll(),
        orderAPI.getStats()
      ]);
      
      setProducts(productsData.products || []);
      setOrders(ordersData.orders || []);
      setCategories(categoriesData || []);
      setStats(statsData || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(productId);
        setProducts(prev => prev.filter(p => p._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'categories', label: 'Categories', icon: Users }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d2f5fc]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3B82F6]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d2f5fc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1426] to-[#1E293B] shadow-lg border-b border-[#334155]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-[#F1F5F9] mt-2">Manage your e-commerce platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Total Products</p>
                <p className="text-3xl font-bold text-[#334155]">{products.length}</p>
              </div>
              <div className="p-3 bg-[#3B82F6]/10 rounded-lg">
                <Package className="w-6 h-6 text-[#3B82F6]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Total Orders</p>
                <p className="text-3xl font-bold text-[#334155]">{stats.totalOrders || 0}</p>
              </div>
              <div className="p-3 bg-[#06B6D4]/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-[#06B6D4]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Total Revenue</p>
                <p className="text-3xl font-bold text-[#334155]">
                  ${(stats.totalRevenue || 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-[#10B981]/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Categories</p>
                <p className="text-3xl font-bold text-[#334155]">{categories.length}</p>
              </div>
              <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#F59E0B]" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E2E8F0]">
          <div className="border-b border-[#E2E8F0]">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#3B82F6] text-[#3B82F6]'
                        : 'border-transparent text-[#64748B] hover:text-[#334155] hover:border-[#E2E8F0]'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Products */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-[#E2E8F0] shadow-lg">
                    <h3 className="text-lg font-semibold text-[#334155] mb-4">Recent Products</h3>
                    <div className="space-y-3">
                      {products.slice(0, 5).map((product) => (
                        <div key={product._id} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                          <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="font-medium text-[#334155]">{product.name}</p>
                            <p className="text-sm text-[#64748B]">${product.price}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            product.stock > 0 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                          }`}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-[#E2E8F0] shadow-lg">
                    <h3 className="text-lg font-semibold text-[#334155] mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                          <div>
                            <p className="font-medium text-[#334155]">#{order.orderNumber}</p>
                            <p className="text-sm text-[#64748B]">{order.customer.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#334155]">${order.total}</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered' ? 'bg-[#10B981]/10 text-[#10B981]' :
                              order.status === 'processing' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                              'bg-[#64748B]/10 text-[#64748B]'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#334155]">Manage Products</h3>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={20} />
                    Add Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#E2E8F0]">
                    <thead className="bg-[#F1F5F9]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E2E8F0]">
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#334155]">{product.name}</div>
                                <div className="text-sm text-[#64748B]">{product.description.substring(0, 50)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs bg-[#3B82F6]/10 text-[#3B82F6] rounded-full">
                              {product.category?.name || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#334155]">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.stock > 10 ? 'bg-[#10B981]/10 text-[#10B981]' :
                              product.stock > 0 ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                              'bg-[#EF4444]/10 text-[#EF4444]'
                            }`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.isActive ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="text-[#3B82F6] hover:text-[#2563EB]"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-[#EF4444] hover:text-[#DC2626]"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#334155]">Order Management</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#E2E8F0]">
                    <thead className="bg-[#F1F5F9]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E2E8F0]">
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#334155]">#{order.orderNumber}</div>
                            <div className="text-sm text-[#64748B]">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#334155]">{order.customer.name}</div>
                            <div className="text-sm text-[#64748B]">{order.customer.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#334155]">
                            ${order.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                              className="px-2 py-1 text-xs rounded-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#3B82F6]"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.paymentStatus === 'paid' ? 'bg-[#10B981]/10 text-[#10B981]' :
                              order.paymentStatus === 'pending' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                              'bg-[#EF4444]/10 text-[#EF4444]'
                            }`}>
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-[#3B82F6] hover:text-[#2563EB]">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#334155]">Category Management</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <div key={category._id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-[#334155]">{category.name}</h4>
                        <button className="text-[#64748B] hover:text-[#334155]">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>
                      <p className="text-[#64748B] text-sm mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#64748B]">
                          {products.filter(p => p.category?._id === category._id).length} products
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="text-[#3B82F6] hover:text-[#2563EB] text-sm">
                            Edit
                          </button>
                          <button className="text-[#EF4444] hover:text-[#DC2626] text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={(newProduct) => {
          setProducts(prev => [newProduct, ...prev]);
          setIsAddModalOpen(false);
        }}
        categories={categories}
      />

      <EditProductModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        onSuccess={(updatedProduct) => {
          setProducts(prev => prev.map(p => p._id === updatedProduct._id ? updatedProduct : p));
          setEditingProduct(null);
        }}
        categories={categories}
      />
    </div>
  );
};

export default AdminPage;
