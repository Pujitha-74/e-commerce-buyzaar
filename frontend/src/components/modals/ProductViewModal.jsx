// import { useState } from 'react';
// import { AnimatePresence } from 'framer-motion';
// import { 
//   X, 
//   ShoppingCart, 
//   Heart, 
//   Share2, 
//   Star, 
//   CheckCircle, 
//   Eye,
//   RotateCcw,
//   Maximize2,
//   ChevronLeft,
//   ChevronRight,
//   Minus,
//   Plus
// } from 'lucide-react';

// const ProductViewModal = ({ isOpen, onClose, product, onAddToCart }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   if (!isOpen || !product) return null;

//   const handleAddToCart = () => {
//     onAddToCart({ ...product, quantity });
//     onClose();
//   };

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: product.description,
//         url: window.location.href
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//     }
//   };

//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % product.images.length);
//   };

//   const prevImage = () => {
//     setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto border border-[#E2E8F0]">
//           {/* Header */}
//           <div className="sticky top-0 bg-gradient-to-r from-[#0B1426] to-[#1E293B] border-b border-[#334155] p-6 rounded-t-3xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-[#3B82F6]/20 rounded-xl">
//                   <Eye className="w-6 h-6 text-[#3B82F6]" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">Product Details</h2>
//                   <p className="text-sm text-[#F1F5F9]">Explore {product.name}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-3 text-[#F1F5F9] hover:text-white hover:bg-[#334155] transition-colors rounded-xl"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Left Column - Image Gallery */}
//               <div className="space-y-6">
//                 {/* Main Image */}
//                 <div className="relative bg-gradient-to-br from-[#F1F5F9] via-[#E2E8F0] to-[#F8FAFC] rounded-2xl p-4 shadow-xl border border-[#E2E8F0]">
//                   <div className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-xl bg-white/50">
//                     <div className="w-full h-full flex items-center justify-center p-4">
//                       <img
//                         src={product.images[selectedImage]}
//                         alt={product.name}
//                         className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-2xl"
//                         style={{ 
//                           maxWidth: 'calc(100% - 2rem)', 
//                           maxHeight: 'calc(100% - 2rem)',
//                           objectFit: 'contain'
//                         }}
//                       />
//                     </div>
                    
//                     {/* Navigation Arrows */}
//                     {product.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={prevImage}
//                           className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
//                         >
//                           <ChevronLeft size={18} className="text-[#334155]" />
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
//                         >
//                           <ChevronRight size={18} className="text-[#334155]" />
//                         </button>
//                       </>
//                     )}

//                     {/* Category Tag */}
//                     <div className="absolute top-2 left-2 z-10">
//                       <div className="bg-[#3B82F6] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
//                         {product.category?.name || 'Category'}
//                       </div>
//                     </div>

//                     {/* Stock Badge */}
//                     <div className="absolute bottom-2 left-2 z-10">
//                       <div className={`px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg ${
//                         product.stock > 10 ? 'bg-[#10B981]' : 
//                         product.stock > 0 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
//                       }`}>
//                         {product.stock > 10 ? `In Stock (${product.stock})` : 
//                          product.stock > 0 ? `Low Stock (${product.stock})` : 'Out of Stock'}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Control Panel */}
//                   <div className="absolute bottom-2 right-2 flex gap-2 z-10">
//                     <button
//                       className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
//                       title="Reset View"
//                     >
//                       <RotateCcw size={16} className="text-[#334155]" />
//                     </button>
//                     <button
//                       className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
//                       title="Fullscreen"
//                     >
//                       <Maximize2 size={16} className="text-[#334155]" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Thumbnail Gallery */}
//                 {product.images.length > 1 && (
//                   <div className="grid grid-cols-4 gap-3">
//                     {product.images.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedImage(index)}
//                         className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 aspect-square ${
//                           selectedImage === index 
//                             ? 'border-[#3B82F6] shadow-lg' 
//                             : 'border-[#E2E8F0] hover:border-[#3B82F6]'
//                         }`}
//                       >
//                         <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC]">
//                           <img
//                             src={image}
//                             alt={`${product.name} view ${index + 1}`}
//                             className="w-full h-full object-contain p-1"
//                             style={{ maxWidth: '100%', maxHeight: '100%' }}
//                           />
//                         </div>
//                         {selectedImage === index && (
//                           <div className="absolute inset-0 bg-[#3B82F6]/20" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Right Column - Product Info */}
//               <div className="space-y-6">
//                 {/* Header */}
//                 <div className="space-y-4">
//                   <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1.5 rounded-full text-sm font-medium">
//                     {product.category?.name || 'Category'}
//                   </div>

//                   <h1 className="text-3xl font-bold text-[#334155] leading-tight">
//                     {product.name}
//                   </h1>

//                   {/* Rating */}
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={20}
//                           className={`${
//                             i < Math.floor(product.rating || 0)
//                               ? 'text-[#F59E0B] fill-current'
//                               : 'text-[#E2E8F0]'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-lg font-semibold text-[#334155]">
//                       {product.rating || 0}
//                     </span>
//                     <span className="text-[#64748B]">
//                       ({product.numReviews || 0} Reviews)
//                     </span>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="space-y-3">
//                   <div className="flex items-baseline gap-3">
//                     <span className="text-4xl font-bold text-[#3B82F6]">
//                       ${product.price}
//                     </span>
//                     {product.originalPrice && (
//                       <span className="text-2xl text-[#64748B] line-through">
//                         ${product.originalPrice}
//                       </span>
//                     )}
//                   </div>
                  
//                   {product.originalPrice && (
//                     <div className="inline-flex items-center gap-2 bg-[#EF4444]/10 text-[#EF4444] px-3 py-1.5 rounded-full text-sm font-medium">
//                       <CheckCircle size={16} />
//                       Save ${(product.originalPrice - product.price).toFixed(2)} 
//                       ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
//                     </div>
//                   )}
//                 </div>

//                 {/* Stock Status */}
//                 <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
//                   <div className={`w-3 h-3 rounded-full ${
//                     product.stock > 10 ? 'bg-[#10B981]' : 
//                     product.stock > 0 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
//                   }`} />
//                   <span className={`font-medium ${
//                     product.stock > 10 ? 'text-[#10B981]' : 
//                     product.stock > 0 ? 'text-[#F59E0B]' : 'text-[#EF4444]'
//                   }`}>
//                     {product.stock > 10 ? '✓ In Stock' : 
//                      product.stock > 0 ? '⚠ Low Stock' : '✗ Out of Stock'}
//                   </span>
//                   {product.stock > 0 && (
//                     <span className="text-[#64748B] ml-2">({product.stock} available)</span>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
//                   <h3 className="text-lg font-semibold text-[#334155] flex items-center gap-2">
//                     <Eye size={20} className="text-[#3B82F6]" />
//                     Description
//                   </h3>
//                   <p className="text-[#64748B] leading-relaxed text-sm">
//                     {product.description}
//                   </p>
//                 </div>

//                 {/* Features */}
//                 {product.features && product.features.length > 0 && (
//                   <div className="space-y-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
//                     <h3 className="text-lg font-semibold text-[#334155] flex items-center gap-2">
//                       <CheckCircle size={20} className="text-[#10B981]" />
//                       Key Features
//                     </h3>
//                     <div className="grid grid-cols-1 gap-3">
//                       {product.features.map((feature, index) => (
//                         <div key={index} className="flex items-start gap-3">
//                           <CheckCircle size={16} className="text-[#10B981] flex-shrink-0 mt-0.5" />
//                           <span className="text-[#334155] text-sm">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Quantity Selector */}
//                 <div className="space-y-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
//                   <h3 className="text-lg font-semibold text-[#334155]">Quantity</h3>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="p-3 rounded-lg border border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-colors disabled:opacity-50"
//                       disabled={quantity <= 1}
//                     >
//                       <Minus size={18} className="text-[#64748B]" />
//                     </button>
//                     <span className="w-20 text-center text-xl font-semibold text-[#334155] bg-white px-4 py-2 rounded-lg border border-[#E2E8F0]">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="p-3 rounded-lg border border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-colors disabled:opacity-50"
//                       disabled={quantity >= product.stock}
//                     >
//                       <Plus size={18} className="text-[#64748B]" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-4 pt-4">
//                   <div className="flex gap-3">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={product.stock === 0}
//                       className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-4 px-6 rounded-xl font-semibold hover:from-[#2563EB] hover:to-[#0891B2] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ShoppingCart size={20} />
//                       {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                     </button>

//                     <button
//                       onClick={handleLike}
//                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                         isLiked 
//                           ? 'border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]' 
//                           : 'border-[#E2E8F0] hover:border-[#EF4444] hover:bg-[#EF4444]/5'
//                       }`}
//                     >
//                       <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
//                     </button>

//                     <button
//                       onClick={handleShare}
//                       className="p-4 rounded-xl border-2 border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all duration-300"
//                     >
//                       <Share2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default ProductViewModal;
