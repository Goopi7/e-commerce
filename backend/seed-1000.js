const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

// Product name generators by category
const productNames = {
  Electronics: [
    'iPhone', 'Samsung Galaxy', 'MacBook', 'Dell Laptop', 'HP Pavilion', 'Asus ROG', 'iPad', 'Surface Pro',
    'AirPods', 'Sony Headphones', 'Bose Speaker', 'Gaming Mouse', 'Mechanical Keyboard', 'Smart Watch',
    'Fitness Tracker', 'Drone', 'Action Camera', 'Smart TV', 'Monitor', 'Graphics Card', 'Processor',
    'Motherboard', 'SSD Drive', 'Hard Drive', 'Power Bank', 'Wireless Charger', 'Smart Home Hub',
    'Security Camera', 'Router', 'Modem', 'Tablet', 'E-Reader', 'VR Headset', 'Gaming Console',
    'Bluetooth Earbuds', 'Soundbar', 'Webcam', 'Microphone', 'USB Hub', 'External Monitor'
  ],
  Clothing: [
    'T-Shirt', 'Jeans', 'Hoodie', 'Jacket', 'Dress', 'Skirt', 'Blouse', 'Sweater', 'Cardigan',
    'Pants', 'Shorts', 'Leggings', 'Activewear', 'Suit', 'Blazer', 'Coat', 'Sneakers', 'Boots',
    'Sandals', 'Heels', 'Flats', 'Athletic Shoes', 'Casual Shoes', 'Formal Shoes', 'Hat', 'Cap',
    'Scarf', 'Gloves', 'Belt', 'Handbag', 'Backpack', 'Wallet', 'Sunglasses', 'Watch', 'Jewelry',
    'Necklace', 'Earrings', 'Bracelet', 'Ring', 'Swimwear'
  ],
  Books: [
    'Programming Guide', 'Business Strategy', 'Self Help', 'Novel', 'Biography', 'History Book',
    'Science Fiction', 'Mystery Novel', 'Romance', 'Thriller', 'Fantasy', 'Non-Fiction',
    'Educational Textbook', 'Reference Manual', 'Cookbook', 'Travel Guide', 'Art Book',
    'Philosophy', 'Psychology', 'Health & Fitness', 'Parenting', 'Finance', 'Investing',
    'Leadership', 'Marketing', 'Technology', 'Design', 'Photography', 'Music', 'Sports',
    'Memoir', 'Poetry', 'Drama', 'Children\'s Book', 'Teen Fiction', 'Academic', 'Research',
    'Language Learning', 'Dictionary', 'Encyclopedia'
  ],
  Home: [
    'Coffee Maker', 'Blender', 'Air Fryer', 'Microwave', 'Toaster', 'Stand Mixer', 'Food Processor',
    'Slow Cooker', 'Pressure Cooker', 'Rice Cooker', 'Juicer', 'Vacuum Cleaner', 'Air Purifier',
    'Humidifier', 'Dehumidifier', 'Space Heater', 'Fan', 'Bedding Set', 'Pillow', 'Mattress',
    'Curtains', 'Blinds', 'Rug', 'Carpet', 'Lamp', 'Ceiling Light', 'Floor Lamp', 'Table Lamp',
    'Decorative Mirror', 'Wall Art', 'Plant Pot', 'Vase', 'Candle', 'Storage Box', 'Organizer',
    'Furniture Set', 'Chair', 'Table', 'Sofa', 'Ottoman'
  ],
  Sports: [
    'Yoga Mat', 'Dumbbells', 'Kettlebell', 'Resistance Bands', 'Exercise Ball', 'Treadmill',
    'Stationary Bike', 'Elliptical', 'Weight Bench', 'Pull-up Bar', 'Jump Rope', 'Foam Roller',
    'Basketball', 'Football', 'Soccer Ball', 'Tennis Racket', 'Badminton Set', 'Golf Club',
    'Baseball Bat', 'Cricket Set', 'Hockey Stick', 'Swimming Goggles', 'Swimsuit', 'Bicycle',
    'Skateboard', 'Roller Skates', 'Hiking Boots', 'Camping Gear', 'Tent', 'Sleeping Bag',
    'Backpack', 'Water Bottle', 'Protein Shaker', 'Gym Bag', 'Athletic Wear', 'Running Shoes',
    'Training Shoes', 'Fitness Tracker', 'Heart Rate Monitor', 'Stopwatch'
  ],
  Beauty: [
    'Skincare Set', 'Face Cream', 'Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen',
    'Face Mask', 'Eye Cream', 'Lip Balm', 'Foundation', 'Concealer', 'Powder', 'Blush',
    'Lipstick', 'Lip Gloss', 'Eyeshadow', 'Mascara', 'Eyeliner', 'Eyebrow Pencil', 'Nail Polish',
    'Perfume', 'Cologne', 'Body Lotion', 'Body Wash', 'Shampoo', 'Conditioner', 'Hair Mask',
    'Hair Oil', 'Styling Cream', 'Hair Dryer', 'Straightener', 'Curling Iron', 'Makeup Brushes',
    'Beauty Sponge', 'Mirror', 'Jewelry', 'Watch', 'Sunglasses', 'Hair Accessories'
  ]
};

const adjectives = [
  'Premium', 'Professional', 'Luxury', 'Deluxe', 'Ultra', 'Pro', 'Elite', 'Advanced', 'Smart',
  'Wireless', 'Portable', 'Compact', 'Ergonomic', 'High-Performance', 'Eco-Friendly', 'Organic',
  'Natural', 'Classic', 'Modern', 'Vintage', 'Designer', 'Stylish', 'Comfortable', 'Durable',
  'Lightweight', 'Heavy-Duty', 'Multi-Purpose', 'All-in-One', 'High-Quality', 'Affordable'
];

const brands = [
  'TechMaster', 'StylePro', 'HomeEssentials', 'FitLife', 'BeautyPlus', 'SmartChoice', 'EliteGear',
  'PremiumSelect', 'QuickFit', 'UltraComfort', 'ProActive', 'MaxPerformance', 'EcoChoice',
  'LifeStyle', 'PowerPro', 'FlexFit', 'ComfortZone', 'ActiveLife', 'SmartLiving', 'UrbanStyle'
];

const saleNames = [
  'Winter Sale', 'Summer Special', 'Spring Collection', 'Autumn Deals', 'Black Friday',
  'Cyber Monday', 'End of Season', 'Clearance Sale', 'Flash Sale', 'Mega Sale',
  'Weekend Special', 'Holiday Sale', 'New Year Sale', 'Valentine\'s Special', 'Back to School',
  'Limited Time Offer', 'Exclusive Deal', 'Member Sale', 'Daily Deal', 'Hot Sale'
];

// Generate random product
function generateProduct(category, index) {
  const categoryNames = productNames[category];
  const baseName = categoryNames[Math.floor(Math.random() * categoryNames.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const variant = ['Pro', 'Max', 'Ultra', 'Plus', 'Elite', 'Standard', 'Deluxe', 'Premium'][Math.floor(Math.random() * 8)];
  
  const name = `${brand} ${adjective} ${baseName} ${variant}`;
  
  // Generate price based on category
  let basePrice;
  switch (category) {
    case 'Electronics':
      basePrice = Math.floor(Math.random() * 1500) + 50; // $50-$1550
      break;
    case 'Clothing':
      basePrice = Math.floor(Math.random() * 200) + 20; // $20-$220
      break;
    case 'Books':
      basePrice = Math.floor(Math.random() * 80) + 10; // $10-$90
      break;
    case 'Home':
      basePrice = Math.floor(Math.random() * 500) + 25; // $25-$525
      break;
    case 'Sports':
      basePrice = Math.floor(Math.random() * 300) + 15; // $15-$315
      break;
    case 'Beauty':
      basePrice = Math.floor(Math.random() * 150) + 15; // $15-$165
      break;
    default:
      basePrice = Math.floor(Math.random() * 200) + 20;
  }

  // Generate stock
  const stock = Math.floor(Math.random() * 200) + 5; // 5-205 items

  // Generate description
  const descriptions = [
    `High-quality ${baseName.toLowerCase()} with premium features and excellent performance.`,
    `Professional-grade ${baseName.toLowerCase()} designed for optimal comfort and durability.`,
    `Premium ${baseName.toLowerCase()} with advanced technology and superior materials.`,
    `Stylish and functional ${baseName.toLowerCase()} perfect for everyday use.`,
    `Top-rated ${baseName.toLowerCase()} with outstanding quality and value.`,
    `Innovative ${baseName.toLowerCase()} featuring cutting-edge design and functionality.`,
    `Reliable ${baseName.toLowerCase()} built to last with exceptional craftsmanship.`,
    `Versatile ${baseName.toLowerCase()} suitable for various applications and needs.`
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];

  // Generate image URL (using different Unsplash collections for variety)
  const imageCollections = {
    Electronics: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      'https://images.unsplash.com/photo-1527814050087-3793815479db',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    ],
    Clothing: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      'https://images.unsplash.com/photo-1542272454315-7ad85ba8e23a',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'
    ],
    Books: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765'
    ],
    Home: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f'
    ],
    Sports: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      'https://images.unsplash.com/photo-1571019613914-85f342c6a11e',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc',
      'https://images.unsplash.com/photo-1558618666-f5d2c3d4f52c'
    ],
    Beauty: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
      'https://images.unsplash.com/photo-1541643600914-78b084683601',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
    ]
  };

  const categoryImages = imageCollections[category];
  const imageBase = categoryImages[Math.floor(Math.random() * categoryImages.length)];
  const image = `${imageBase}?w=400&h=400&fit=crop&crop=center&auto=format`;

  // Determine if on sale (20% chance)
  const isOnSale = Math.random() < 0.2;
  
  let saleData = undefined;
  if (isOnSale) {
    const discountPercentage = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
    const salePrice = Math.round(basePrice * (1 - discountPercentage / 100));
    const saleName = saleNames[Math.floor(Math.random() * saleNames.length)];
    
    // Generate random sale dates
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    
    saleData = {
      isOnSale: true,
      salePrice: salePrice,
      discountPercentage: discountPercentage,
      saleStartDate: startDate,
      saleEndDate: endDate,
      saleName: saleName
    };
  }

  return {
    name,
    description,
    price: basePrice,
    category,
    image,
    stock,
    ...(saleData && { sale: saleData }),
    ratings: {
      average: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
      count: Math.floor(Math.random() * 500) + 10 // 10 to 510 reviews
    }
  };
}

// Generate all products
function generateAllProducts() {
  const categories = Object.keys(productNames);
  const productsPerCategory = Math.floor(1000 / categories.length);
  const extraProducts = 1000 % categories.length;
  
  let allProducts = [];
  let productIndex = 0;
  
  categories.forEach((category, categoryIndex) => {
    const countForThisCategory = productsPerCategory + (categoryIndex < extraProducts ? 1 : 0);
    
    for (let i = 0; i < countForThisCategory; i++) {
      allProducts.push(generateProduct(category, productIndex++));
    }
  });
  
  return allProducts;
}

const seedDatabase = async () => {
  try {
    console.log('Generating 1000+ products...');
    const products = generateAllProducts();
    console.log(`Generated ${products.length} products`);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert products in batches to avoid memory issues
    const batchSize = 100;
    let inserted = 0;
    
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await Item.insertMany(batch);
      inserted += batch.length;
      console.log(`Inserted ${inserted}/${products.length} products...`);
    }

    // Get statistics
    const stats = await Item.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          onSale: { 
            $sum: { 
              $cond: ['$sale.isOnSale', 1, 0] 
            }
          },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log('\n📊 Database Statistics:');
    console.log('========================');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} products (${stat.onSale} on sale) - Avg price: $${stat.avgPrice.toFixed(2)}`);
    });
    
    const totalOnSale = stats.reduce((sum, stat) => sum + stat.onSale, 0);
    console.log(`\n🏷️  Total products: ${products.length}`);
    console.log(`💰 Products on sale: ${totalOnSale} (${((totalOnSale/products.length)*100).toFixed(1)}%)`);
    
    console.log('\n✅ Database seeded successfully with 1000+ products!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
