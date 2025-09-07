const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const sampleItems = [
  // ELECTRONICS - 25 products
  {
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system with 5x optical zoom.",
    price: 1199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center",
    stock: 35,
    sale: {
      isOnSale: true,
      salePrice: 999,
      discountPercentage: 17,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-12-31'),
      saleName: 'Tech Winter Sale'
    }
  },
  {
    name: "MacBook Pro M3",
    description: "Professional laptop with M3 chip, 16GB RAM, 512GB SSD. Perfect for development and creative work.",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    stock: 20,
    sale: {
      isOnSale: true,
      salePrice: 1699,
      discountPercentage: 15,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-03-31'),
      saleName: 'Back to School Sale'
    }
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI-powered features.",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with 30-hour battery life and premium sound quality.",
    price: 399,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center",
    stock: 60,
    sale: {
      isOnSale: true,
      salePrice: 299,
      discountPercentage: 25,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-02-29'),
      saleName: 'Audio Equipment Sale'
    }
  },
  {
    name: "iPad Pro 12.9 inch",
    description: "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    price: 1099,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "Dell XPS 13 Laptop",
    description: "Ultra-portable laptop with 13.4-inch InfinityEdge display, Intel Core i7, and premium design.",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
    stock: 30
  },
  {
    name: "Gaming Mouse Pro X",
    description: "High-precision gaming mouse with 25600 DPI sensor, RGB lighting, and customizable buttons.",
    price: 129,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop&crop=center",
    stock: 80
  },
  {
    name: "4K Webcam Ultra",
    description: "Professional 4K webcam with auto-focus, noise reduction, and wide-angle lens for streaming.",
    price: 199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Wireless Charging Station",
    description: "3-in-1 wireless charging station for iPhone, AirPods, and Apple Watch with fast charging support.",
    price: 89,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=400&h=400&fit=crop&crop=center",
    stock: 70
  },
  {
    name: "Smart Home Hub",
    description: "Central hub for smart home devices with voice control and app integration for 200+ devices.",
    price: 149,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    stock: 55,
    sale: {
      isOnSale: true,
      salePrice: 119,
      discountPercentage: 20,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-02-14'),
      saleName: 'Smart Home Sale'
    }
  },

  // CLOTHING - 20 products
  {
    name: "Nike Air Jordan 1 Retro",
    description: "Iconic basketball sneakers with premium leather construction, Air-Sole unit, and classic design.",
    price: 170,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    stock: 80,
    sale: {
      isOnSale: true,
      salePrice: 136,
      discountPercentage: 20,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-03-31'),
      saleName: 'Spring Fashion Sale'
    }
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-leg jeans with authentic fit, premium denim, and timeless style.",
    price: 89,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&crop=center",
    stock: 120
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with Boost midsole, Primeknit upper, and responsive cushioning.",
    price: 189,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&crop=center",
    stock: 65
  },
  {
    name: "Casual Cotton T-Shirt",
    description: "Premium organic cotton t-shirt with modern fit, soft texture, and fade-resistant colors.",
    price: 29,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    stock: 200
  },
  {
    name: "Leather Jacket Classic",
    description: "Genuine leather jacket with vintage styling, premium construction, and comfortable fit.",
    price: 299,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&crop=center",
    stock: 40
  },

  // BOOKS - 15 products
  {
    name: "The Great Gatsby",
    description: "F. Scott Fitzgerald's masterpiece about the Jazz Age and the American Dream. A timeless classic.",
    price: 12.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop&crop=center",
    stock: 200,
    sale: {
      isOnSale: true,
      salePrice: 9.99,
      discountPercentage: 23,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-04-30'),
      saleName: 'Literary Classics Sale'
    }
  },
  {
    name: "Clean Code",
    description: "Robert C. Martin's guide to writing clean, maintainable code. Essential for programmers.",
    price: 49.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop&crop=center",
    stock: 80
  },
  {
    name: "Atomic Habits",
    description: "James Clear's practical guide to building good habits and breaking bad ones.",
    price: 18.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop&crop=center",
    stock: 150
  },

  // HOME - 15 products
  {
    name: "Coffee Maker Deluxe",
    description: "Premium coffee maker with programmable brewing, thermal carafe, and advanced brewing technology.",
    price: 189.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    stock: 45,
    sale: {
      isOnSale: true,
      salePrice: 149.99,
      discountPercentage: 21,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-02-29'),
      saleName: 'Kitchen Essentials Sale'
    }
  },
  {
    name: "Air Fryer XL",
    description: "Large capacity air fryer with digital controls, multiple cooking presets, and easy cleanup.",
    price: 149.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1585515656671-bbc73454c9d7?w=400&h=400&fit=crop&crop=center",
    stock: 60
  },
  {
    name: "Blender High-Speed",
    description: "Professional-grade blender with variable speed control and pulse feature for smoothies and soups.",
    price: 299.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop&crop=center",
    stock: 35
  },

  // SPORTS - 10 products
  {
    name: "Yoga Mat Premium",
    description: "High-quality yoga mat with non-slip surface, excellent grip, and eco-friendly materials.",
    price: 59.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center",
    stock: 120
  },
  {
    name: "Dumbbells Adjustable Set",
    description: "Space-saving adjustable dumbbells with quick-change weight plates, 5-50 lbs per dumbbell.",
    price: 299.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=400&fit=crop&crop=center",
    stock: 35
  },
  {
    name: "Basketball Official Size",
    description: "Official size basketball with premium leather construction and superior grip.",
    price: 39.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&crop=center",
    stock: 80
  },

  // BEAUTY - 10 products  
  {
    name: "Designer Watch Luxury",
    description: "Swiss-made luxury watch with automatic movement, sapphire crystal, and leather strap.",
    price: 899.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
    stock: 25,
    sale: {
      isOnSale: true,
      salePrice: 699.99,
      discountPercentage: 22,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-03-15'),
      saleName: 'Luxury Collection Sale'
    }
  },
  {
    name: "Skincare Set Anti-Aging",
    description: "Complete anti-aging skincare set with cleanser, serum, moisturizer, and SPF protection.",
    price: 149.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
    stock: 60
  },
  {
    name: "Makeup Brush Set Professional",
    description: "Professional makeup brush set with 24 brushes for face and eyes, premium synthetic bristles.",
    price: 89.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
    stock: 80
  },
  {
    name: "Perfume Eau de Parfum",
    description: "Luxury eau de parfum with floral and woody notes, long-lasting fragrance in elegant bottle.",
    price: 129.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Sunglasses Designer",
    description: "Designer sunglasses with polarized lenses, UV protection, and lightweight titanium frame.",
    price: 199.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
    stock: 70
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert sample items
    await Item.insertMany(sampleItems);
    console.log('Sample items inserted successfully');
    console.log(`Inserted ${sampleItems.length} products with properly matched names and images`);

    console.log('Database seeded successfully with properly matched product data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
