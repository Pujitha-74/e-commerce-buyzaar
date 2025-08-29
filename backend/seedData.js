const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Load environment variables
dotenv.config({ path: './config.env' });

// Sample categories
const categories = [
  {
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop'
  },
  {
    name: 'Sports',
    description: 'Sports equipment and activewear',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop'
  }
];

// Sample products - 30 Electronics, 30 Sports, 30 Fashion
const products = [
  // ===== ELECTRONICS CATEGORY (30 products) =====
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    features: ['Noise Cancellation', '30h Battery', 'Bluetooth 5.0', 'Touch Controls'],
    specifications: {'Brand': 'AudioTech', 'Color': 'Black', 'Weight': '250g', 'Connectivity': 'Bluetooth 5.0'}
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    originalPrice: 349.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 30,
    rating: 4.7,
    numReviews: 89,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
    specifications: {'Brand': 'FitTech', 'Color': 'Silver', 'Weight': '45g', 'Water Resistance': '5ATM'}
  },
  {
    name: 'Smart Home Hub',
    description: 'Central control for all your smart home devices',
    price: 149.99,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 40,
    rating: 4.4,
    numReviews: 156,
    features: ['Voice Control', 'WiFi 6', 'Zigbee Support', 'Mobile App'],
    specifications: {'Brand': 'SmartHome', 'Connectivity': 'WiFi 6 + Zigbee', 'Color': 'White', 'Dimensions': '10x10x5cm'}
  },
  {
    name: 'Professional Camera Lens',
    description: 'High-quality 50mm f/1.8 prime lens for professional photography',
    price: 599.99,
    originalPrice: 699.99,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 15,
    rating: 4.8,
    numReviews: 234,
    features: ['50mm Focal Length', 'f/1.8 Aperture', 'Auto Focus', 'Weather Sealed'],
    specifications: {'Brand': 'PhotoPro', 'Focal Length': '50mm', 'Aperture': 'f/1.8', 'Mount': 'Canon EF'}
  },
  {
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RTX graphics and 144Hz display',
    price: 1299.99,
    originalPrice: 1499.99,
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 20,
    rating: 4.9,
    numReviews: 89,
    features: ['RTX 4060 Graphics', '144Hz Display', '16GB RAM', '1TB SSD'],
    specifications: {'Brand': 'GameTech', 'Processor': 'Intel i7-12700H', 'Graphics': 'RTX 4060', 'RAM': '16GB DDR4'}
  },
  {
    name: '4K Smart TV',
    description: '65-inch 4K Ultra HD Smart TV with HDR and voice control',
    price: 899.99,
    originalPrice: 1199.99,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 25,
    rating: 4.6,
    numReviews: 312,
    features: ['4K Ultra HD', 'HDR10+', 'Smart TV', 'Voice Control'],
    specifications: {'Brand': 'VisionTech', 'Screen Size': '65"', 'Resolution': '4K', 'HDR': 'HDR10+'}
  },
  {
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 159.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 75,
    rating: 4.3,
    numReviews: 201,
    features: ['True Wireless', 'Noise Cancellation', '24h Battery', 'Water Resistant'],
    specifications: {'Brand': 'SoundWave', 'Color': 'White', 'Battery': '24h', 'Water Resistance': 'IPX4'}
  },
  {
    name: 'Tablet Pro',
    description: '10.9-inch tablet with Apple M1 chip and Magic Keyboard support',
    price: 799.99,
    originalPrice: 899.99,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 35,
    rating: 4.8,
    numReviews: 156,
    features: ['M1 Chip', '10.9" Display', 'Magic Keyboard', 'Apple Pencil'],
    specifications: {'Brand': 'Apple', 'Screen': '10.9"', 'Chip': 'M1', 'Storage': '128GB'}
  },
  {
    name: 'Gaming Mouse',
    description: 'RGB gaming mouse with 25K DPI sensor and programmable buttons',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 100,
    rating: 4.4,
    numReviews: 89,
    features: ['25K DPI', 'RGB Lighting', 'Programmable Buttons', 'Ergonomic Design'],
    specifications: {'Brand': 'GameTech', 'DPI': '25,600', 'Buttons': '7', 'Weight': '95g'}
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Cherry MX Blue mechanical keyboard with RGB backlighting',
    price: 129.99,
    originalPrice: 159.99,
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 60,
    rating: 4.7,
    numReviews: 134,
    features: ['Cherry MX Blue', 'RGB Backlight', 'N-Key Rollover', 'Aluminum Frame'],
    specifications: {'Brand': 'KeyCraft', 'Switches': 'Cherry MX Blue', 'Layout': 'Full Size', 'Backlight': 'RGB'}
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam with autofocus and built-in microphone',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 80,
    rating: 4.2,
    numReviews: 67,
    features: ['1080p HD', 'Autofocus', 'Built-in Mic', 'Privacy Cover'],
    specifications: {'Brand': 'VideoTech', 'Resolution': '1080p', 'Frame Rate': '30fps', 'Field of View': '90°'}
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360-degree sound and 20-hour battery',
    price: 129.99,
    originalPrice: 159.99,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 45,
    rating: 4.5,
    numReviews: 98,
    features: ['360° Sound', '20h Battery', 'Water Resistant', 'Party Mode'],
    specifications: {'Brand': 'SoundWave', 'Power': '20W', 'Battery': '20h', 'Water Resistance': 'IPX7'}
  },
  {
    name: 'Smartphone Pro',
    description: 'Latest smartphone with 5G, triple camera, and 256GB storage',
    price: 999.99,
    originalPrice: 1199.99,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 30,
    rating: 4.9,
    numReviews: 445,
    features: ['5G Network', 'Triple Camera', '256GB Storage', 'Wireless Charging'],
    specifications: {'Brand': 'PhoneTech', 'Screen': '6.7"', 'Camera': '48MP', 'Storage': '256GB'}
  },
  {
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand with cooling fan',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 120,
    rating: 4.3,
    numReviews: 78,
    features: ['Adjustable Height', 'Cooling Fan', 'Aluminum Build', 'Cable Management'],
    specifications: {'Brand': 'DeskTech', 'Material': 'Aluminum', 'Height': 'Adjustable', 'Weight': '800g'}
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, SD card reader, and USB ports',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 150,
    rating: 4.1,
    numReviews: 56,
    features: ['7 Ports', 'HDMI Output', 'SD Card Reader', 'USB 3.0'],
    specifications: {'Brand': 'ConnectTech', 'Ports': '7-in-1', 'HDMI': '4K@30Hz', 'USB': 'USB 3.0'}
  },
  {
    name: 'Wireless Charger',
    description: '15W fast wireless charger with LED indicator and safety features',
    price: 29.99,
    originalPrice: 39.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 200,
    rating: 4.4,
    numReviews: 89,
    features: ['15W Fast Charging', 'LED Indicator', 'Safety Protection', 'Universal Compatible'],
    specifications: {'Brand': 'ChargeTech', 'Power': '15W', 'Compatibility': 'Universal', 'Safety': 'Overcharge Protection'}
  },
  {
    name: 'Gaming Headset',
    description: '7.1 surround sound gaming headset with noise-canceling microphone',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 70,
    rating: 4.6,
    numReviews: 123,
    features: ['7.1 Surround', 'Noise-Canceling Mic', 'RGB Lighting', 'Memory Foam'],
    specifications: {'Brand': 'GameTech', 'Audio': '7.1 Surround', 'Microphone': 'Noise-Canceling', 'Compatibility': 'Multi-Platform'}
  },
  {
    name: 'Monitor 4K',
    description: '27-inch 4K monitor with HDR and 144Hz refresh rate',
    price: 399.99,
    originalPrice: 499.99,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 25,
    rating: 4.8,
    numReviews: 167,
    features: ['4K Resolution', 'HDR Support', '144Hz Refresh', 'FreeSync'],
    specifications: {'Brand': 'DisplayTech', 'Screen': '27"', 'Resolution': '4K', 'Refresh Rate': '144Hz'}
  },
  {
    name: 'External SSD',
    description: '1TB external SSD with USB 3.2 Gen 2 and 1050MB/s read speed',
    price: 129.99,
    originalPrice: 179.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 55,
    rating: 4.7,
    numReviews: 89,
    features: ['1TB Storage', 'USB 3.2 Gen 2', '1050MB/s Read', 'Shock Resistant'],
    specifications: {'Brand': 'StorageTech', 'Capacity': '1TB', 'Interface': 'USB 3.2 Gen 2', 'Speed': '1050MB/s'}
  },
  {
    name: 'Smart Bulb Set',
    description: '4-pack smart LED bulbs with WiFi control and 16 million colors',
    price: 59.99,
    originalPrice: 79.99,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 90,
    rating: 4.3,
    numReviews: 134,
    features: ['WiFi Control', '16M Colors', 'Voice Control', 'Scheduling'],
    specifications: {'Brand': 'LightTech', 'Pack': '4 Bulbs', 'Colors': '16 Million', 'Control': 'WiFi + Voice'}
  },
  {
    name: 'Bluetooth Keyboard',
    description: 'Slim Bluetooth keyboard with scissor switches and 6-month battery',
    price: 69.99,
    originalPrice: 89.99,
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 80,
    rating: 4.2,
    numReviews: 67,
    features: ['Bluetooth 5.0', 'Scissor Switches', '6-Month Battery', 'Slim Design'],
    specifications: {'Brand': 'KeyTech', 'Connectivity': 'Bluetooth 5.0', 'Battery': '6 Months', 'Layout': 'Compact'}
  },
  {
    name: 'Portable Charger',
    description: '20,000mAh power bank with USB-C PD and wireless charging',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 65,
    rating: 4.5,
    numReviews: 98,
    features: ['20,000mAh', 'USB-C PD', 'Wireless Charging', 'Fast Charging'],
    specifications: {'Brand': 'PowerTech', 'Capacity': '20,000mAh', 'Output': 'USB-C PD', 'Wireless': '10W'}
  },
  {
    name: 'Gaming Controller',
    description: 'Wireless gaming controller with haptic feedback and customizable buttons',
    price: 59.99,
    originalPrice: 79.99,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 110,
    rating: 4.4,
    numReviews: 145,
    features: ['Wireless', 'Haptic Feedback', 'Customizable Buttons', '40h Battery'],
    specifications: {'Brand': 'GameTech', 'Connectivity': 'Wireless', 'Battery': '40h', 'Compatibility': 'Multi-Platform'}
  },
  {
    name: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with premium sound and smart home integration',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 40,
    rating: 4.6,
    numReviews: 178,
    features: ['Voice Control', 'Premium Sound', 'Smart Home', 'Multi-Room'],
    specifications: {'Brand': 'SoundTech', 'Audio': 'Premium', 'Control': 'Voice', 'Integration': 'Smart Home'}
  },
  {
    name: 'Laptop Cooling Pad',
    description: '5-fan laptop cooling pad with adjustable height and LED lighting',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 95,
    rating: 4.1,
    numReviews: 56,
    features: ['5 Cooling Fans', 'Adjustable Height', 'LED Lighting', 'USB Powered'],
    specifications: {'Brand': 'CoolTech', 'Fans': '5', 'Height': 'Adjustable', 'Power': 'USB'}
  },
  {
    name: 'Webcam Stand',
    description: 'Adjustable webcam stand with ring light and phone holder',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 70,
    rating: 4.3,
    numReviews: 78,
    features: ['Adjustable Height', 'Ring Light', 'Phone Holder', 'Clamp Mount'],
    specifications: {'Brand': 'DeskTech', 'Mount': 'Clamp', 'Light': 'Ring Light', 'Holder': 'Phone Compatible'}
  },
  {
    name: 'Cable Organizer',
    description: 'Cable management kit with clips, ties, and sleeves for clean setup',
    price: 19.99,
    originalPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 180,
    rating: 4.0,
    numReviews: 45,
    features: ['Cable Clips', 'Velcro Ties', 'Sleeves', 'Organizer Box'],
    specifications: {'Brand': 'OrganizeTech', 'Contents': '50 Pieces', 'Material': 'Plastic + Velcro', 'Color': 'Black'}
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with touch control and adjustable brightness',
    price: 34.99,
    originalPrice: 49.99,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 120,
    rating: 4.2,
    numReviews: 89,
    features: ['LED Light', 'Touch Control', 'Adjustable Brightness', 'Flexible Arm'],
    specifications: {'Brand': 'LightTech', 'Light': 'LED', 'Control': 'Touch', 'Arm': 'Flexible'}
  },
  {
    name: 'Phone Mount',
    description: 'Car phone mount with suction cup and 360-degree rotation',
    price: 24.99,
    originalPrice: 34.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 150,
    rating: 4.1,
    numReviews: 67,
    features: ['Suction Cup', '360° Rotation', 'Universal Fit', 'One-Touch Lock'],
    specifications: {'Brand': 'MountTech', 'Mount': 'Suction Cup', 'Rotation': '360°', 'Fit': 'Universal'}
  },
  {
    name: 'Screen Protector',
    description: 'Tempered glass screen protector with 9H hardness and oleophobic coating',
    price: 14.99,
    originalPrice: 19.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 300,
    rating: 4.4,
    numReviews: 234,
    features: ['9H Hardness', 'Oleophobic Coating', 'Crystal Clear', 'Easy Installation'],
    specifications: {'Brand': 'ProtectTech', 'Hardness': '9H', 'Coating': 'Oleophobic', 'Clarity': '99.9%'}
  },
  {
    name: 'USB Cable Set',
    description: 'Multi-pack USB cables with fast charging and data transfer',
    price: 19.99,
    originalPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 200,
    rating: 4.2,
    numReviews: 89,
    features: ['Fast Charging', 'Data Transfer', 'Durable Build', 'Multi-Length'],
    specifications: {'Brand': 'CableTech', 'Charging': 'Fast', 'Transfer': 'High Speed', 'Lengths': '3 Sizes'}
  },
  
  // ===== SPORTS CATEGORY (30 products) =====
  {
    name: 'Running Shoes Pro',
    description: 'Professional running shoes with advanced cushioning and breathable mesh',
    price: 129.99,
    originalPrice: 159.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 80,
    rating: 4.7,
    numReviews: 234,
    features: ['Advanced Cushioning', 'Breathable Mesh', 'Lightweight', 'Durable Outsole'],
    specifications: {'Brand': 'RunTech', 'Weight': '280g', 'Drop': '8mm', 'Terrain': 'Road'}
  },
  {
    name: 'Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitor and sleep tracking',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 120,
    rating: 4.5,
    numReviews: 189,
    features: ['Heart Rate Monitor', 'Sleep Tracking', '7-day Battery', 'Water Resistant'],
    specifications: {'Brand': 'FitTrack', 'Battery': '7 Days', 'Water Resistance': 'IP68', 'Display': 'Color'}
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with alignment lines and eco-friendly materials',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 150,
    rating: 4.6,
    numReviews: 156,
    features: ['Non-slip Surface', 'Alignment Lines', 'Eco-friendly', '6mm Thickness'],
    specifications: {'Brand': 'YogaLife', 'Thickness': '6mm', 'Material': 'TPE', 'Size': '183x61cm'}
  },
  {
    name: 'Basketball',
    description: 'Official size basketball with premium grip and indoor/outdoor use',
    price: 34.99,
    originalPrice: 44.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 200,
    rating: 4.4,
    numReviews: 89,
    features: ['Official Size', 'Premium Grip', 'Indoor/Outdoor', 'Durable'],
    specifications: {'Brand': 'BallTech', 'Size': 'Official', 'Material': 'Composite Leather', 'Use': 'Indoor/Outdoor'}
  },
  {
    name: 'Tennis Racket Pro',
    description: 'Professional tennis racket with carbon fiber frame and optimal balance',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 45,
    rating: 4.8,
    numReviews: 123,
    features: ['Carbon Fiber Frame', 'Optimal Balance', 'Vibration Dampening', 'Professional Grade'],
    specifications: {'Brand': 'TennisPro', 'Weight': '300g', 'Head Size': '100 sq in', 'String Pattern': '16x19'}
  },
  {
    name: 'Cycling Helmet',
    description: 'Lightweight cycling helmet with MIPS protection and adjustable fit',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 85,
    rating: 4.6,
    numReviews: 167,
    features: ['MIPS Protection', 'Lightweight', 'Adjustable Fit', 'Ventilation'],
    specifications: {'Brand': 'CycleSafe', 'Weight': '280g', 'Protection': 'MIPS', 'Vents': '22'}
  },
  {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set with quick-change weight system',
    price: 299.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 30,
    rating: 4.7,
    numReviews: 78,
    features: ['Adjustable Weights', 'Quick Change', 'Space Saving', '5-50 lbs'],
    specifications: {'Brand': 'WeightTech', 'Weight Range': '5-50 lbs', 'Material': 'Steel', 'Grip': 'Rubber'}
  },
  {
    name: 'Swimming Goggles',
    description: 'Anti-fog swimming goggles with UV protection and comfortable fit',
    price: 24.99,
    originalPrice: 34.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 180,
    rating: 4.3,
    numReviews: 145,
    features: ['Anti-fog Coating', 'UV Protection', 'Comfortable Fit', 'Adjustable Strap'],
    specifications: {'Brand': 'SwimTech', 'Lens': 'Anti-fog', 'UV Protection': '100%', 'Fit': 'Adjustable'}
  },
  {
    name: 'Soccer Ball',
    description: 'Professional soccer ball with FIFA quality and perfect roundness',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 120,
    rating: 4.5,
    numReviews: 98,
    features: ['FIFA Quality', 'Perfect Roundness', 'Durable', 'Professional'],
    specifications: {'Brand': 'SoccerPro', 'Size': '5', 'Material': 'Synthetic Leather', 'Quality': 'FIFA Approved'}
  },
  {
    name: 'Resistance Bands Set',
    description: 'Complete resistance bands set with different resistance levels',
    price: 19.99,
    originalPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 250,
    rating: 4.2,
    numReviews: 67,
    features: ['5 Resistance Levels', 'Durable Material', 'Portable', 'Versatile'],
    specifications: {'Brand': 'ResistTech', 'Levels': '5', 'Material': 'Natural Latex', 'Length': '200cm'}
  },
  {
    name: 'Golf Club Set',
    description: 'Complete golf club set with bag and all essential clubs',
    price: 399.99,
    originalPrice: 499.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 25,
    rating: 4.6,
    numReviews: 89,
    features: ['Complete Set', 'Golf Bag', 'All Clubs', 'Beginner Friendly'],
    specifications: {'Brand': 'GolfTech', 'Clubs': '12', 'Bag': 'Included', 'Level': 'Beginner'}
  },
  {
    name: 'Jump Rope',
    description: 'Professional jump rope with adjustable length and ball bearings',
    price: 14.99,
    originalPrice: 19.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 300,
    rating: 4.1,
    numReviews: 123,
    features: ['Adjustable Length', 'Ball Bearings', 'Durable Cable', 'Comfortable Handles'],
    specifications: {'Brand': 'JumpTech', 'Length': 'Adjustable', 'Bearings': 'Ball Bearings', 'Material': 'Steel Cable'}
  },
  {
    name: 'Pilates Ring',
    description: 'Pilates ring for core strengthening and flexibility exercises',
    price: 29.99,
    originalPrice: 39.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 95,
    rating: 4.4,
    numReviews: 78,
    features: ['Core Strengthening', 'Flexibility', 'Portable', 'Versatile'],
    specifications: {'Brand': 'PilatesTech', 'Diameter': '35cm', 'Material': 'Foam', 'Weight': 'Light'}
  },
  {
    name: 'Boxing Gloves',
    description: 'Professional boxing gloves with proper padding and wrist support',
    price: 59.99,
    originalPrice: 79.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 70,
    rating: 4.5,
    numReviews: 134,
    features: ['Proper Padding', 'Wrist Support', 'Breathable', 'Professional Grade'],
    specifications: {'Brand': 'BoxTech', 'Weight': '12oz', 'Material': 'Leather', 'Padding': 'Multi-layer'}
  },
  {
    name: 'Hiking Boots',
    description: 'Waterproof hiking boots with ankle support and durable sole',
    price: 149.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 55,
    rating: 4.7,
    numReviews: 189,
    features: ['Waterproof', 'Ankle Support', 'Durable Sole', 'Breathable'],
    specifications: {'Brand': 'HikeTech', 'Waterproof': 'Yes', 'Height': 'Mid', 'Sole': 'Vibram'}
  },
  {
    name: 'Foam Roller',
    description: 'High-density foam roller for muscle recovery and flexibility',
    price: 24.99,
    originalPrice: 34.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 140,
    rating: 4.3,
    numReviews: 89,
    features: ['High Density', 'Muscle Recovery', 'Flexibility', 'Portable'],
    specifications: {'Brand': 'RecoveryTech', 'Length': '45cm', 'Diameter': '15cm', 'Density': 'High'}
  },
  {
    name: 'Medicine Ball',
    description: 'Weighted medicine ball for strength training and core exercises',
    price: 34.99,
    originalPrice: 44.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 110,
    rating: 4.2,
    numReviews: 67,
    features: ['Weighted', 'Strength Training', 'Core Exercises', 'Durable'],
    specifications: {'Brand': 'MedicineTech', 'Weight': '8 lbs', 'Material': 'Rubber', 'Diameter': '25cm'}
  },
  {
    name: 'Yoga Blocks',
    description: 'Eco-friendly yoga blocks for support and alignment in poses',
    price: 19.99,
    originalPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 180,
    rating: 4.1,
    numReviews: 56,
    features: ['Eco-friendly', 'Support', 'Alignment', 'Lightweight'],
    specifications: {'Brand': 'YogaTech', 'Material': 'Cork', 'Size': '23x15x7cm', 'Weight': 'Light'}
  },
  {
    name: 'Tennis Balls',
    description: 'Professional tennis balls with consistent bounce and durability',
    price: 9.99,
    originalPrice: 14.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 500,
    rating: 4.4,
    numReviews: 234,
    features: ['Professional Grade', 'Consistent Bounce', 'Durable', '3-Pack'],
    specifications: {'Brand': 'TennisTech', 'Pack': '3 Balls', 'Type': 'Regular Duty', 'Bounce': 'Consistent'}
  },
  {
    name: 'Fitness Bench',
    description: 'Adjustable fitness bench for strength training and exercises',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 35,
    rating: 4.6,
    numReviews: 89,
    features: ['Adjustable', 'Strength Training', 'Stable', 'Folding'],
    specifications: {'Brand': 'BenchTech', 'Weight Capacity': '600 lbs', 'Adjustable': 'Yes', 'Material': 'Steel'}
  },
  {
    name: 'Swimming Cap',
    description: 'Silicone swimming cap for hair protection and reduced drag',
    price: 14.99,
    originalPrice: 19.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 220,
    rating: 4.2,
    numReviews: 78,
    features: ['Hair Protection', 'Reduced Drag', 'Comfortable', 'Durable'],
    specifications: {'Brand': 'SwimTech', 'Material': 'Silicone', 'Size': 'Universal', 'Protection': 'Hair'}
  },
  {
    name: 'Baseball Glove',
    description: 'Professional baseball glove with premium leather and proper break-in',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 60,
    rating: 4.5,
    numReviews: 123,
    features: ['Premium Leather', 'Proper Break-in', 'Professional Grade', 'Comfortable'],
    specifications: {'Brand': 'BaseballTech', 'Size': '12.5"', 'Material': 'Leather', 'Position': 'Outfield'}
  },
  {
    name: 'Volleyball',
    description: 'Official volleyball with perfect roundness and tournament approved',
    price: 29.99,
    originalPrice: 39.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 140,
    rating: 4.3,
    numReviews: 89,
    features: ['Official Size', 'Perfect Roundness', 'Tournament Approved', 'Durable'],
    specifications: {'Brand': 'VolleyTech', 'Size': 'Official', 'Material': 'Synthetic Leather', 'Approval': 'Tournament'}
  },
  {
    name: 'Fitness Ball',
    description: 'Anti-burst fitness ball for core training and stability exercises',
    price: 24.99,
    originalPrice: 34.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 160,
    rating: 4.1,
    numReviews: 67,
    features: ['Anti-burst', 'Core Training', 'Stability', 'Versatile'],
    specifications: {'Brand': 'BallTech', 'Diameter': '65cm', 'Material': 'Anti-burst', 'Weight Capacity': '600 lbs'}
  },
  {
    name: 'Track Spikes',
    description: 'Lightweight track spikes for sprinting and middle distance events',
    price: 69.99,
    originalPrice: 89.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 75,
    rating: 4.4,
    numReviews: 98,
    features: ['Lightweight', 'Sprinting', 'Middle Distance', 'Spike Plates'],
    specifications: {'Brand': 'TrackTech', 'Weight': 'Light', 'Events': 'Sprint/Middle', 'Spikes': 'Removable'}
  },
  {
    name: 'Climbing Harness',
    description: 'Safety climbing harness with adjustable leg loops and gear loops',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 45,
    rating: 4.6,
    numReviews: 134,
    features: ['Safety Certified', 'Adjustable', 'Gear Loops', 'Comfortable'],
    specifications: {'Brand': 'ClimbTech', 'Safety': 'CE Certified', 'Weight Capacity': '120kg', 'Gear Loops': '4'}
  },
  {
    name: 'Martial Arts Gi',
    description: 'Traditional martial arts uniform with reinforced stitching and comfort',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 85,
    rating: 4.3,
    numReviews: 78,
    features: ['Traditional Design', 'Reinforced Stitching', 'Comfortable', 'Durable'],
    specifications: {'Brand': 'MartialTech', 'Material': 'Cotton', 'Weight': 'Light', 'Stitching': 'Reinforced'}
  },
  {
    name: 'Ski Goggles',
    description: 'Anti-fog ski goggles with UV protection and interchangeable lenses',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 55,
    rating: 4.5,
    numReviews: 123,
    features: ['Anti-fog', 'UV Protection', 'Interchangeable Lenses', 'Wide Field'],
    specifications: {'Brand': 'SkiTech', 'Lens': 'Anti-fog', 'UV Protection': '100%', 'Field': 'Wide View'}
  },
  {
    name: 'Rowing Machine',
    description: 'Magnetic resistance rowing machine with LCD display and foldable design',
    price: 299.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 20,
    rating: 4.7,
    numReviews: 89,
    features: ['Magnetic Resistance', 'LCD Display', 'Foldable', 'Smooth Motion'],
    specifications: {'Brand': 'RowTech', 'Resistance': 'Magnetic', 'Display': 'LCD', 'Weight Capacity': '300 lbs'}
  },
  {
    name: 'Punching Bag',
    description: 'Heavy punching bag with durable outer shell and proper weight',
    price: 149.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 35,
    rating: 4.4,
    numReviews: 67,
    features: ['Heavy Weight', 'Durable Shell', 'Proper Weight', 'Hanging Ready'],
    specifications: {'Brand': 'PunchTech', 'Weight': '100 lbs', 'Material': 'Synthetic Leather', 'Height': 'Adjustable'}
  },
  {
    name: 'Fitness Tracker Watch',
    description: 'Smart fitness watch with GPS, heart rate, and activity tracking',
    price: 159.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 90,
    rating: 4.6,
    numReviews: 178,
    features: ['GPS Tracking', 'Heart Rate', 'Activity Tracking', 'Water Resistant'],
    specifications: {'Brand': 'FitWatch', 'GPS': 'Yes', 'Battery': '7 Days', 'Water Resistance': '5ATM'}
  },
  
  // ===== FASHION CATEGORY (30 products) =====
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with vintage wash and comfortable fit',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 120,
    rating: 4.6,
    numReviews: 234,
    features: ['Vintage Wash', 'Comfortable Fit', 'Classic Style', 'Durable Denim'],
    specifications: {'Brand': 'DenimStyle', 'Material': '100% Cotton', 'Fit': 'Regular', 'Wash': 'Vintage'}
  },
  {
    name: 'Premium Leather Bag',
    description: 'Handcrafted leather bag with multiple compartments and elegant design',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 45,
    rating: 4.8,
    numReviews: 189,
    features: ['Handcrafted', 'Multiple Compartments', 'Elegant Design', 'Premium Leather'],
    specifications: {'Brand': 'LeatherLux', 'Material': 'Genuine Leather', 'Compartments': '5', 'Style': 'Tote'}
  },
  {
    name: 'Designer Sunglasses',
    description: 'Luxury sunglasses with UV protection and polarized lenses',
    price: 159.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 80,
    rating: 4.7,
    numReviews: 156,
    features: ['UV Protection', 'Polarized Lenses', 'Luxury Design', 'Lightweight Frame'],
    specifications: {'Brand': 'SunglassLux', 'UV Protection': '100%', 'Lenses': 'Polarized', 'Frame': 'Acetate'}
  },
  {
    name: 'Silk Scarf Collection',
    description: 'Premium silk scarves with hand-painted designs and elegant patterns',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 95,
    rating: 4.5,
    numReviews: 123,
    features: ['Premium Silk', 'Hand-painted', 'Elegant Patterns', 'Versatile Styling'],
    specifications: {'Brand': 'SilkElegance', 'Material': '100% Silk', 'Size': '90x90cm', 'Care': 'Dry Clean'}
  },
  {
    name: 'Statement Necklace',
    description: 'Bold statement necklace with crystal embellishments and adjustable chain',
    price: 69.99,
    originalPrice: 89.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 110,
    rating: 4.4,
    numReviews: 89,
    features: ['Crystal Embellishments', 'Adjustable Chain', 'Bold Design', 'Versatile'],
    specifications: {'Brand': 'JewelryLux', 'Material': 'Gold Plated', 'Length': 'Adjustable', 'Stones': 'Crystal'}
  },
  {
    name: 'Cashmere Sweater',
    description: 'Luxurious cashmere sweater with ribbed texture and comfortable fit',
    price: 149.99,
    originalPrice: 189.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 75,
    rating: 4.8,
    numReviews: 167,
    features: ['Luxurious Cashmere', 'Ribbed Texture', 'Comfortable Fit', 'Soft Touch'],
    specifications: {'Brand': 'CashmereLux', 'Material': '100% Cashmere', 'Fit': 'Regular', 'Care': 'Hand Wash'}
  },
  {
    name: 'Designer Watch',
    description: 'Elegant designer watch with leather strap and minimalist dial',
    price: 299.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 40,
    rating: 4.9,
    numReviews: 234,
    features: ['Elegant Design', 'Leather Strap', 'Minimalist Dial', 'Swiss Movement'],
    specifications: {'Brand': 'WatchLux', 'Movement': 'Swiss Quartz', 'Case': 'Stainless Steel', 'Water Resistance': '3ATM'}
  },
  {
    name: 'Evening Dress',
    description: 'Stunning evening dress with sequin embellishments and flowing silhouette',
    price: 249.99,
    originalPrice: 299.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 35,
    rating: 4.7,
    numReviews: 89,
    features: ['Sequin Embellishments', 'Flowing Silhouette', 'Evening Wear', 'Elegant Design'],
    specifications: {'Brand': 'DressLux', 'Material': 'Polyester Blend', 'Length': 'Floor Length', 'Style': 'A-line'}
  },
  {
    name: 'Leather Belt',
    description: 'Classic leather belt with brass buckle and adjustable sizing',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 180,
    rating: 4.3,
    numReviews: 145,
    features: ['Classic Design', 'Brass Buckle', 'Adjustable Sizing', 'Genuine Leather'],
    specifications: {'Brand': 'BeltLux', 'Material': 'Genuine Leather', 'Buckle': 'Brass', 'Sizing': 'Adjustable'}
  },
  {
    name: 'Summer Hat',
    description: 'Wide-brim summer hat with UV protection and adjustable fit',
    price: 39.99,
    originalPrice: 49.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 150,
    rating: 4.2,
    numReviews: 78,
    features: ['Wide Brim', 'UV Protection', 'Adjustable Fit', 'Summer Style'],
    specifications: {'Brand': 'HatLux', 'Material': 'Straw', 'Brim': 'Wide', 'UV Protection': 'UPF 50+'}
  },
  {
    name: 'Silk Blouse',
    description: 'Elegant silk blouse with button-up design and flowing sleeves',
    price: 119.99,
    originalPrice: 149.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 85,
    rating: 4.6,
    numReviews: 134,
    features: ['Elegant Design', 'Button-up', 'Flowing Sleeves', 'Premium Silk'],
    specifications: {'Brand': 'BlouseLux', 'Material': '100% Silk', 'Style': 'Button-up', 'Sleeves': 'Flowing'}
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury designer handbag with gold hardware and spacious interior',
    price: 399.99,
    originalPrice: 499.99,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 25,
    rating: 4.9,
    numReviews: 189,
    features: ['Luxury Design', 'Gold Hardware', 'Spacious Interior', 'Premium Materials'],
    specifications: {'Brand': 'HandbagLux', 'Material': 'Leather', 'Hardware': 'Gold Plated', 'Interior': 'Spacious'}
  },
  {
    name: 'Pearl Earrings',
    description: 'Classic pearl earrings with sterling silver posts and elegant design',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 120,
    rating: 4.5,
    numReviews: 167,
    features: ['Classic Design', 'Sterling Silver', 'Natural Pearls', 'Elegant Style'],
    specifications: {'Brand': 'PearlLux', 'Material': 'Sterling Silver', 'Pearls': 'Natural', 'Style': 'Stud'}
  },
  {
    name: 'Wool Coat',
    description: 'Warm wool coat with double-breasted design and belt closure',
    price: 299.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 55,
    rating: 4.7,
    numReviews: 123,
    features: ['Warm Wool', 'Double-breasted', 'Belt Closure', 'Classic Style'],
    specifications: {'Brand': 'CoatLux', 'Material': 'Wool Blend', 'Style': 'Double-breasted', 'Closure': 'Belt'}
  },
  {
    name: 'Silk Dress',
    description: 'Flowing silk dress with floral print and adjustable straps',
    price: 179.99,
    originalPrice: 229.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 65,
    rating: 4.6,
    numReviews: 98,
    features: ['Flowing Design', 'Floral Print', 'Adjustable Straps', 'Premium Silk'],
    specifications: {'Brand': 'DressLux', 'Material': '100% Silk', 'Print': 'Floral', 'Straps': 'Adjustable'}
  },
  {
    name: 'Leather Wallet',
    description: 'Slim leather wallet with multiple card slots and coin pocket',
    price: 59.99,
    originalPrice: 79.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 200,
    rating: 4.4,
    numReviews: 145,
    features: ['Slim Design', 'Multiple Card Slots', 'Coin Pocket', 'Genuine Leather'],
    specifications: {'Brand': 'WalletLux', 'Material': 'Genuine Leather', 'Card Slots': '6', 'Style': 'Bifold'}
  },
  {
    name: 'Summer Dress',
    description: 'Lightweight summer dress with floral pattern and adjustable waist',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 140,
    rating: 4.3,
    numReviews: 89,
    features: ['Lightweight', 'Floral Pattern', 'Adjustable Waist', 'Summer Style'],
    specifications: {'Brand': 'DressLux', 'Material': 'Cotton Blend', 'Pattern': 'Floral', 'Waist': 'Adjustable'}
  },
  {
    name: 'Designer Ring',
    description: 'Elegant designer ring with gemstone setting and precious metal band',
    price: 249.99,
    originalPrice: 299.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 45,
    rating: 4.8,
    numReviews: 134,
    features: ['Elegant Design', 'Gemstone Setting', 'Precious Metal', 'Artisan Crafted'],
    specifications: {'Brand': 'RingLux', 'Metal': '14K Gold', 'Setting': 'Gemstone', 'Style': 'Solitaire'}
  },
  {
    name: 'Cashmere Scarf',
    description: 'Luxurious cashmere scarf with fringe detail and soft texture',
    price: 99.99,
    originalPrice: 129.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 110,
    rating: 4.5,
    numReviews: 156,
    features: ['Luxurious Cashmere', 'Fringe Detail', 'Soft Texture', 'Warm'],
    specifications: {'Brand': 'ScarfLux', 'Material': '100% Cashmere', 'Length': '180cm', 'Style': 'Fringed'}
  },
  {
    name: 'Evening Clutch',
    description: 'Elegant evening clutch with metallic finish and chain strap',
    price: 129.99,
    originalPrice: 159.99,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 75,
    rating: 4.4,
    numReviews: 89,
    features: ['Elegant Design', 'Metallic Finish', 'Chain Strap', 'Evening Wear'],
    specifications: {'Brand': 'ClutchLux', 'Material': 'Metallic Leather', 'Strap': 'Chain', 'Style': 'Evening'}
  },
  {
    name: 'Silk Pajamas',
    description: 'Luxurious silk pajama set with comfortable fit and elegant design',
    price: 189.99,
    originalPrice: 239.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 60,
    rating: 4.6,
    numReviews: 123,
    features: ['Luxurious Silk', 'Comfortable Fit', 'Elegant Design', 'Matching Set'],
    specifications: {'Brand': 'PajamaLux', 'Material': '100% Silk', 'Set': 'Top & Bottom', 'Fit': 'Relaxed'}
  },
  {
    name: 'Designer Bracelet',
    description: 'Elegant designer bracelet with adjustable chain and elegant clasp',
    price: 159.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 85,
    rating: 4.5,
    numReviews: 98,
    features: ['Elegant Design', 'Adjustable Chain', 'Elegant Clasp', 'Versatile'],
    specifications: {'Brand': 'BraceletLux', 'Material': 'Gold Plated', 'Chain': 'Adjustable', 'Clasp': 'Lobster'}
  },
  {
    name: 'Leather Jacket',
    description: 'Classic leather jacket with zipper details and comfortable lining',
    price: 349.99,
    originalPrice: 449.99,
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 40,
    rating: 4.8,
    numReviews: 167,
    features: ['Classic Design', 'Zipper Details', 'Comfortable Lining', 'Genuine Leather'],
    specifications: {'Brand': 'JacketLux', 'Material': 'Genuine Leather', 'Lining': 'Comfortable', 'Style': 'Classic'}
  },
  {
    name: 'Summer Sandals',
    description: 'Comfortable summer sandals with adjustable straps and cushioned sole',
    price: 69.99,
    originalPrice: 89.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 160,
    rating: 4.3,
    numReviews: 78,
    features: ['Comfortable', 'Adjustable Straps', 'Cushioned Sole', 'Summer Style'],
    specifications: {'Brand': 'SandalsLux', 'Material': 'Leather', 'Sole': 'Cushioned', 'Straps': 'Adjustable'}
  },
  {
    name: 'Designer Necklace',
    description: 'Elegant designer necklace with pendant and adjustable chain length',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 55,
    rating: 4.7,
    numReviews: 134,
    features: ['Elegant Design', 'Pendant', 'Adjustable Chain', 'Luxury Materials'],
    specifications: {'Brand': 'NecklaceLux', 'Material': 'Gold Plated', 'Chain': 'Adjustable', 'Style': 'Pendant'}
  },
  {
    name: 'Silk Robe',
    description: 'Luxurious silk robe with belt closure and elegant embroidery',
    price: 229.99,
    originalPrice: 289.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 35,
    rating: 4.6,
    numReviews: 89,
    features: ['Luxurious Silk', 'Belt Closure', 'Elegant Embroidery', 'Comfortable Fit'],
    specifications: {'Brand': 'RobeLux', 'Material': '100% Silk', 'Closure': 'Belt', 'Embroidery': 'Elegant'}
  },
  {
    name: 'Evening Heels',
    description: 'Elegant evening heels with metallic finish and comfortable fit',
    price: 179.99,
    originalPrice: 229.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 65,
    rating: 4.5,
    numReviews: 123,
    features: ['Elegant Design', 'Metallic Finish', 'Comfortable Fit', 'Evening Style'],
    specifications: {'Brand': 'HeelsLux', 'Material': 'Satin', 'Heel': '3 inch', 'Style': 'Evening'}
  },
  {
    name: 'Designer Earrings',
    description: 'Luxury designer earrings with crystal embellishments and elegant design',
    price: 139.99,
    originalPrice: 179.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 90,
    rating: 4.4,
    numReviews: 78,
    features: ['Luxury Design', 'Crystal Embellishments', 'Elegant Style', 'Versatile'],
    specifications: {'Brand': 'EarringsLux', 'Material': 'Gold Plated', 'Stones': 'Crystal', 'Style': 'Drop'}
  },
  {
    name: 'Cashmere Cardigan',
    description: 'Soft cashmere cardigan with button-up design and comfortable fit',
    price: 189.99,
    originalPrice: 239.99,
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 70,
    rating: 4.7,
    numReviews: 145,
    features: ['Soft Cashmere', 'Button-up Design', 'Comfortable Fit', 'Versatile Style'],
    specifications: {'Brand': 'CardiganLux', 'Material': '100% Cashmere', 'Style': 'Button-up', 'Fit': 'Regular'}
  },
  {
    name: 'Designer Bag',
    description: 'Elegant designer bag with structured design and premium materials',
    price: 449.99,
    originalPrice: 549.99,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    stock: 30,
    rating: 4.9,
    numReviews: 167,
    features: ['Elegant Design', 'Structured Shape', 'Premium Materials', 'Luxury Brand'],
    specifications: {'Brand': 'BagLux', 'Material': 'Leather', 'Shape': 'Structured', 'Interior': 'Organized'}
  }
];

// Sample orders
const orders = [
  {
    orderNumber: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    items: [
      {
        product: null, // Will be set after product creation
        quantity: 1,
        price: 199.99
      }
    ],
    subtotal: 199.99,
    tax: 19.99,
    shipping: 9.99,
    total: 229.97,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  {
    orderNumber: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1-555-0456',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      }
    },
    items: [
      {
        product: null, // Will be set after product creation
        quantity: 2,
        price: 299.99
      }
    ],
    subtotal: 599.98,
    tax: 59.99,
    shipping: 0,
    total: 659.97,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buyzaar');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Insert products with category references
    // First 30 products go to Electronics, next 30 to Sports, last 30 to Fashion
    const productsWithCategories = products.map((product, index) => {
      let categoryId;
      if (index < 30) {
        // First 30 products -> Electronics
        categoryId = createdCategories.find(cat => cat.name === 'Electronics')._id;
      } else if (index < 60) {
        // Next 30 products -> Sports
        categoryId = createdCategories.find(cat => cat.name === 'Sports')._id;
      } else {
        // Last 30 products -> Fashion
        categoryId = createdCategories.find(cat => cat.name === 'Fashion')._id;
      }
      
      return {
        ...product,
        category: categoryId
      };
    });
    
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`Created ${createdProducts.length} products`);

    // Insert orders with product references - need to save individually to trigger pre-save hooks
    const createdOrders = [];
    for (let i = 0; i < orders.length; i++) {
      const orderData = {
        ...orders[i],
        items: orders[i].items.map(item => ({
          ...item,
          product: createdProducts[i % createdProducts.length]._id
        }))
      };
      
      const order = new Order(orderData);
      const savedOrder = await order.save();
      createdOrders.push(savedOrder);
    }
    console.log(`Created ${createdOrders.length} orders`);

    console.log('Database seeded successfully!');
    console.log('\nSample data created:');
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Products: ${createdProducts.length}`);
    console.log(`- Orders: ${createdOrders.length}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
