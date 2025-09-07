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
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with 30-hour battery life and premium sound quality.",
    price: 399,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "Dell XPS 13 Laptop",
    description: "Ultra-portable laptop with 13.4-inch InfinityEdge display, Intel Core i7, and premium design.",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
    stock: 30
  },
  {
    name: "Gaming Mouse Pro X",
    description: "High-precision gaming mouse with 25600 DPI sensor, RGB lighting, and customizable buttons.",
    price: 129,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1609592094081-7b6b4c6eb57c?w=400&h=400&fit=crop&crop=center",
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
  {
    name: "Bluetooth Speaker Premium",
    description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 24-hour battery.",
    price: 199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    stock: 65
  },
  {
    name: "Gaming Keyboard RGB",
    description: "Mechanical gaming keyboard with RGB backlighting, tactile switches, and programmable keys.",
    price: 159,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
    stock: 40
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring, GPS, 7-day battery, and 50+ workout modes.",
    price: 299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    stock: 50
  },
  {
    name: "USB-C Hub Multi-Port",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery.",
    price: 79,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop&crop=center",
    stock: 85
  },
  {
    name: "VR Headset Elite",
    description: "Next-gen VR headset with 4K display, 120Hz refresh rate, and immersive spatial audio.",
    price: 599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=400&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "Drone with 4K Camera",
    description: "Professional drone with 4K camera, 3-axis gimbal, GPS, and 30-minute flight time.",
    price: 799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop&crop=center",
    stock: 15
  },
  {
    name: "Power Bank 20000mAh",
    description: "High-capacity power bank with fast charging, USB-C PD, and LED display showing battery level.",
    price: 59,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609592094081-7b6b4c6eb57c?w=400&h=400&fit=crop&crop=center",
    stock: 100
  },
  {
    name: "Gaming Monitor 27 inch",
    description: "27-inch gaming monitor with 144Hz refresh rate, 1ms response time, and HDR support.",
    price: 349,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=center",
    stock: 35
  },
  {
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation, transparency mode, and 8-hour battery.",
    price: 249,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center",
    stock: 75
  },
  {
    name: "Smart Doorbell Camera",
    description: "WiFi-enabled doorbell camera with 1080p HD video, two-way audio, and motion detection.",
    price: 179,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    stock: 40
  },
  {
    name: "Portable SSD 1TB",
    description: "Ultra-fast portable SSD with USB 3.2 Gen 2, compact design, and hardware encryption.",
    price: 149,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop&crop=center",
    stock: 60
  },
  {
    name: "Smart Light Bulbs Set",
    description: "Set of 4 smart LED bulbs with app control, 16 million colors, and voice assistant support.",
    price: 99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop&crop=center",
    stock: 90
  },
  {
    name: "Action Camera 4K",
    description: "Waterproof action camera with 4K recording, image stabilization, and wide-angle lens.",
    price: 299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=center",
    stock: 30
  },
  {
    name: "Robot Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology, app control, and automatic dirt disposal.",
    price: 599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    stock: 20
  },
  {
    name: "Digital Photo Frame",
    description: "10-inch smart photo frame with WiFi, touchscreen, and cloud storage integration.",
    price: 129,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1551122573-0b9b3c75e0d3?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },

  // CLOTHING - 20 products
  {
    name: "Nike Air Jordan 1 Retro",
    description: "Iconic basketball sneakers with premium leather construction, Air-Sole unit, and classic design.",
    price: 170,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1542272454315-7ad85ba8e23a?w=400&h=400&fit=crop&crop=center",
    stock: 120
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with Boost midsole, Primeknit upper, and responsive cushioning.",
    price: 189,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
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
  {
    name: "Designer Hoodie Premium",
    description: "Luxury hoodie with premium cotton blend, embroidered logo, and comfortable fit.",
    price: 149,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
    stock: 85
  },
  {
    name: "Formal Dress Shirt",
    description: "Professional dress shirt with wrinkle-free fabric, tailored fit, and classic collar.",
    price: 79,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop&crop=center",
    stock: 95
  },
  {
    name: "Yoga Pants High-Waist",
    description: "High-performance yoga pants with moisture-wicking fabric and four-way stretch.",
    price: 69,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1506629905607-d8b8e02e26b8?w=400&h=400&fit=crop&crop=center",
    stock: 110
  },
  {
    name: "Winter Coat Parka",
    description: "Insulated winter coat with water-resistant fabric, fur-lined hood, and multiple pockets.",
    price: 249,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop&crop=center",
    stock: 35
  },
  {
    name: "Summer Sundress",
    description: "Flowy summer dress with floral print, breathable fabric, and adjustable straps.",
    price: 89,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
    stock: 70
  },
  {
    name: "Business Suit Set",
    description: "Professional two-piece suit with tailored jacket and matching trousers in premium wool blend.",
    price: 399,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "Athletic Shorts",
    description: "Lightweight athletic shorts with moisture-wicking fabric and built-in compression liner.",
    price: 39,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1506629905607-d8b8e02e26b8?w=400&h=400&fit=crop&crop=center",
    stock: 150
  },
  {
    name: "Wool Sweater Cable-Knit",
    description: "Classic cable-knit sweater in premium merino wool with ribbed cuffs and hem.",
    price: 129,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    stock: 60
  },
  {
    name: "Denim Jacket Vintage",
    description: "Vintage-style denim jacket with classic fit, authentic wash, and metal button details.",
    price: 99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop&crop=center",
    stock: 75
  },
  {
    name: "Activewear Set Women's",
    description: "Matching sports bra and leggings set with compression fit and moisture management.",
    price: 119,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1506629905607-d8b8e02e26b8?w=400&h=400&fit=crop&crop=center",
    stock: 90
  },
  {
    name: "Polo Shirt Classic",
    description: "Traditional polo shirt with three-button placket, ribbed collar, and comfortable fit.",
    price: 59,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop&crop=center",
    stock: 130
  },
  {
    name: "Maxi Dress Bohemian",
    description: "Flowing maxi dress with bohemian print, v-neckline, and comfortable elastic waist.",
    price: 109,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
    stock: 55
  },
  {
    name: "Cardigan Cashmere",
    description: "Luxury cashmere cardigan with button-front closure and refined drape.",
    price: 199,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Track Pants Joggers",
    description: "Comfortable jogger pants with elastic waistband, side pockets, and tapered fit.",
    price: 69,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1506629905607-d8b8e02e26b8?w=400&h=400&fit=crop&crop=center",
    stock: 100
  },
  {
    name: "Blazer Tailored",
    description: "Professional blazer with structured shoulders, notched lapels, and modern fit.",
    price: 179,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    stock: 40
  },

  // BOOKS - 15 products
  {
    name: "The Great Gatsby",
    description: "F. Scott Fitzgerald's masterpiece about the Jazz Age and the American Dream. A timeless classic.",
    price: 12.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    stock: 150
  },
  {
    name: "To Kill a Mockingbird",
    description: "Harper Lee's Pulitzer Prize-winning novel about racial injustice and loss of innocence.",
    price: 14.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center",
    stock: 120
  },
  {
    name: "Think and Grow Rich",
    description: "Napoleon Hill's classic guide to personal achievement and financial success.",
    price: 16.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    stock: 100
  },
  {
    name: "The Psychology of Money",
    description: "Morgan Housel's insights into how people think about money and wealth building.",
    price: 22.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    stock: 90
  },
  {
    name: "1984",
    description: "George Orwell's dystopian masterpiece about totalitarianism and surveillance.",
    price: 13.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center",
    stock: 110
  },
  {
    name: "The Lean Startup",
    description: "Eric Ries's methodology for developing businesses and products through validated learning.",
    price: 26.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop&crop=center",
    stock: 70
  },
  {
    name: "Pride and Prejudice",
    description: "Jane Austen's beloved novel of manners, marriage, and social class in Regency England.",
    price: 11.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    stock: 95
  },
  {
    name: "The 7 Habits of Highly Effective People",
    description: "Stephen Covey's principle-centered approach to solving personal and professional problems.",
    price: 19.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    stock: 85
  },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    description: "J.K. Rowling's magical tale of a young wizard's journey at Hogwarts School.",
    price: 15.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center",
    stock: 200
  },
  {
    name: "The Alchemist",
    description: "Paulo Coelho's philosophical novel about following your dreams and personal legend.",
    price: 17.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    stock: 75
  },
  {
    name: "Rich Dad Poor Dad",
    description: "Robert Kiyosaki's lessons about money and investing from two father figures.",
    price: 20.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    stock: 105
  },
  {
    name: "The Catcher in the Rye",
    description: "J.D. Salinger's coming-of-age story about teenage rebellion and alienation.",
    price: 14.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center",
    stock: 80
  },
  {
    name: "Good to Great",
    description: "Jim Collins's research on what makes companies transition from good to great performance.",
    price: 28.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop&crop=center",
    stock: 60
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
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
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
  {
    name: "Stand Mixer KitchenAid",
    description: "Iconic stand mixer with tilt-head design, 10-speed mixing, and multiple attachment options.",
    price: 379.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "Vacuum Cleaner Cordless",
    description: "Lightweight cordless vacuum with powerful suction, HEPA filtration, and multiple attachments.",
    price: 249.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    stock: 40
  },
  {
    name: "Bedding Set Luxury",
    description: "Premium bedding set with Egyptian cotton sheets, duvet cover, and matching pillowcases.",
    price: 199.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop&crop=center",
    stock: 70
  },
  {
    name: "Dining Table Set",
    description: "Modern dining table set with solid wood construction, seats 6 people comfortably.",
    price: 899.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    stock: 15
  },
  {
    name: "Sofa Sectional",
    description: "Comfortable sectional sofa with premium upholstery, reversible chaise, and storage ottoman.",
    price: 1299.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    stock: 12
  },
  {
    name: "Area Rug Persian",
    description: "Hand-woven Persian-style area rug with intricate patterns and premium wool construction.",
    price: 399.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    stock: 30
  },
  {
    name: "Cookware Set Stainless Steel",
    description: "Professional 12-piece stainless steel cookware set with tri-ply construction and heat-resistant handles.",
    price: 299.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    stock: 50
  },
  {
    name: "Table Lamp LED",
    description: "Modern LED table lamp with adjustable brightness, USB charging port, and sleek design.",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop&crop=center",
    stock: 85
  },
  {
    name: "Mirror Wall Decorative",
    description: "Large decorative wall mirror with ornate frame, perfect for living room or bedroom.",
    price: 149.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Curtains Blackout",
    description: "Room-darkening blackout curtains with thermal insulation and noise reduction properties.",
    price: 79.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    stock: 90
  },
  {
    name: "Storage Ottoman",
    description: "Multi-functional storage ottoman with hidden compartment and comfortable seating.",
    price: 119.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    stock: 65
  },
  {
    name: "Plant Pot Set Ceramic",
    description: "Set of 3 ceramic plant pots with drainage holes and matching saucers in modern design.",
    price: 49.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
    stock: 100
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
    name: "Treadmill Folding",
    description: "Compact folding treadmill with LCD display, heart rate monitor, and multiple workout programs.",
    price: 899.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=400&fit=crop&crop=center",
    stock: 20
  },
  {
    name: "Basketball Official Size",
    description: "Official size basketball with premium leather construction and superior grip.",
    price: 39.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&crop=center",
    stock: 80
  },
  {
    name: "Tennis Racket Pro",
    description: "Professional tennis racket with graphite construction, perfect balance, and comfortable grip.",
    price: 149.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
    stock: 45
  },
  {
    name: "Resistance Bands Set",
    description: "Complete resistance bands set with multiple resistance levels and door anchor attachment.",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=400&fit=crop&crop=center",
    stock: 150
  },
  {
    name: "Football American",
    description: "Official size American football with composite leather cover and excellent grip.",
    price: 34.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&crop=center",
    stock: 70
  },
  {
    name: "Bicycle Mountain",
    description: "21-speed mountain bike with aluminum frame, front suspension, and all-terrain tires.",
    price: 599.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1558618666-f5d2c3d4f52c?w=400&h=400&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "Swimming Goggles",
    description: "Anti-fog swimming goggles with UV protection and adjustable straps for competitive swimming.",
    price: 24.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop&crop=center",
    stock: 100
  },
  {
    name: "Golf Club Set",
    description: "Complete golf club set for beginners with driver, irons, wedges, putter, and golf bag.",
    price: 399.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop&crop=center",
    stock: 30
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
    name: "Hair Dryer Ionic",
    description: "Professional ionic hair dryer with multiple heat settings, cool shot button, and concentrator nozzle.",
    price: 79.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&crop=center",
    stock: 55
  },
  {
    name: "Sunglasses Designer",
    description: "Designer sunglasses with polarized lenses, UV protection, and lightweight titanium frame.",
    price: 199.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
    stock: 70
  },
  {
    name: "Nail Polish Set",
    description: "Collection of 12 premium nail polishes in trending colors with long-lasting formula.",
    price: 49.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
    stock: 90
  },
  {
    name: "Face Mask Set Hydrating",
    description: "Set of 10 hydrating face masks with hyaluronic acid and natural botanical extracts.",
    price: 39.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
    stock: 100
  },
  {
    name: "Jewelry Set Pearl",
    description: "Elegant pearl jewelry set with necklace, earrings, and bracelet in genuine cultured pearls.",
    price: 299.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
    stock: 35
  },
  {
    name: "Lipstick Collection Matte",
    description: "Collection of 6 matte lipsticks in versatile shades with long-wearing, comfortable formula.",
    price: 69.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
    stock: 75
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
    console.log(`Inserted ${sampleItems.length} products across all categories`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
