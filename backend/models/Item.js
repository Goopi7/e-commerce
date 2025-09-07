const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Product'
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  sale: {
    isOnSale: {
      type: Boolean,
      default: false
    },
    salePrice: {
      type: Number,
      min: 0
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100
    },
    saleStartDate: {
      type: Date
    },
    saleEndDate: {
      type: Date
    },
    saleName: {
      type: String,
      default: 'Special Offer'
    }
  }
}, {
  timestamps: true
});

// Index for better search performance
itemSchema.index({ name: 'text', description: 'text' });
itemSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Item', itemSchema);
