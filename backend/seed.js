const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const sampleItems = [
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip and titanium design. Features advanced camera system and aerospace-grade titanium.",
    price: 999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
    stock: 25,
    sale: {
      isOnSale: true,
      salePrice: 899,
      discountPercentage: 10,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-12-31'),
      saleName: 'Tech Winter Sale'
    }
  },
  {
    name: "MacBook Air M2",
    description: "Powerful laptop with M2 chip, perfect for work and creativity. Ultra-thin design with all-day battery life.",
    price: 1199,
    category: "Electronics", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
    stock: 15,
    sale: {
      isOnSale: true,
      salePrice: 999,
      discountPercentage: 17,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-03-31'),
      saleName: 'Back to School Sale'
    }
  },
  {
    name: "Nike Air Jordan 1",
    description: "Classic basketball sneakers with iconic design. Premium leather construction with Air-Sole unit for comfort.",
    price: 170,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    stock: 50,
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
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald. A timeless masterpiece of American literature.",
    price: 12.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    stock: 100,
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
    name: "Coffee Maker Pro",
    description: "Premium coffee maker with advanced brewing technology. Perfect for coffee enthusiasts who demand excellence.",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    stock: 30,
    sale: {
      isOnSale: true,
      salePrice: 67.99,
      discountPercentage: 24,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-02-29'),
      saleName: 'Kitchen Essentials Sale'
    }
  },
  {
    name: "Yoga Mat Premium",
    description: "High-quality yoga mat for all your fitness needs. Non-slip surface with excellent grip and cushioning.",
    price: 45,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center",
    stock: 75
  },
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with active noise cancellation. Superior sound quality with 30-hour battery life.",
    price: 199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    stock: 40,
    sale: {
      isOnSale: true,
      salePrice: 149,
      discountPercentage: 25,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-02-29'),
      saleName: 'Audio Equipment Sale'
    }
  },
  {
    name: "Designer Watch",
    description: "Elegant watch with leather strap and premium finishing. Swiss movement with water resistance.",
    price: 299,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
    stock: 20,
    sale: {
      isOnSale: true,
      salePrice: 239,
      discountPercentage: 20,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-03-15'),
      saleName: 'Luxury Collection Sale'
    }
  },
  {
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting. 16000 DPI sensor with customizable buttons for competitive gaming.",
    price: 79,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center",
    stock: 60
  },
  {
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt perfect for everyday wear. Premium organic cotton with modern fit.",
    price: 25,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    stock: 85
  },
  {
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality. AI-powered assistant with 360-degree audio.",
    price: 149,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop&crop=center",
    stock: 35,
    sale: {
      isOnSale: true,
      salePrice: 119,
      discountPercentage: 20,
      saleStartDate: new Date('2024-01-01'),
      saleEndDate: new Date('2024-02-14'),
      saleName: 'Smart Home Sale'
    }
  },
  {
    name: "Cooking Essentials Set",
    description: "Complete cooking set with pots, pans, and utensils. Professional-grade stainless steel construction.",
    price: 199,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    stock: 25
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

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
