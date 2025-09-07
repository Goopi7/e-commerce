# E-Commerce Application

A full-stack e-commerce web application built with React.js (frontend) and Express.js (backend), featuring user authentication, product management, shopping cart functionality, and more.

## 🚀 Live Demo

- **Backend API**: https://e-commerce-ngqq.onrender.com
- **API Documentation**: https://e-commerce-ngqq.onrender.com/api

## Features

### Backend (Express.js)
- ✅ JWT-based authentication (signup/login)
- ✅ CRUD APIs for products/items
- ✅ Advanced filtering (price, categories, search, sorting)
- ✅ Shopping cart management APIs
- ✅ MongoDB database integration
- ✅ User session management
- ✅ Data persistence

### Frontend (React.js + TypeScript)
- ✅ Professional, modern UI design
- ✅ User authentication (signup/login pages)
- ✅ Product listing with advanced filters
- ✅ Search functionality
- ✅ Shopping cart with add/remove/update functionality
- ✅ Cart persistence (survives page refresh and logout/login)
- ✅ Responsive design
- ✅ Professional styling with CSS
- ✅ Loading states and error handling

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React.js with TypeScript
- React Router for navigation
- Axios for API calls
- Context API for state management
- Lucide React for icons
- Professional CSS styling

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd e-commerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_complex
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, use:
```env
REACT_APP_API_URL=https://e-commerce-ngqq.onrender.com/api
```

### 4. Database Setup

Start MongoDB service on your machine. The application will create the database automatically.

To populate the database with sample products, run:
```bash
cd backend
node seed-fixed.js
```

Or use the npm script from the root:
```bash
npm run seed
```

## Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will start on http://localhost:5000

2. **Start the Frontend Development Server**
   In a new terminal:
   ```bash
   cd frontend
   npm start
   ```
   The frontend will start on http://localhost:3000

3. **Access the Application**
   Open your browser and navigate to http://localhost:3000

## Production Deployment

### Deployed on Render

This application is configured for deployment on Render using the included `render.yaml` file.

#### Current Deployment
- **Backend**: https://e-commerce-ngqq.onrender.com
- **API Base URL**: https://e-commerce-ngqq.onrender.com/api

#### Environment Variables for Production

**Backend:**
```env
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_long_and_secure_secret_key_here
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**Frontend:**
```env
REACT_APP_API_URL=https://e-commerce-ngqq.onrender.com/api
```

### Deploying Updates

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. **Render will automatically redeploy** when you push to the main branch.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products/Items
- `GET /api/items` - Get products with filters
- `GET /api/items/categories` - Get all categories
- `GET /api/items/:id` - Get single product
- `POST /api/items` - Create product (authenticated)
- `PUT /api/items/:id` - Update product (authenticated)
- `DELETE /api/items/:id` - Delete product (authenticated)

### Shopping Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

## Project Structure

```
e-commerce/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Main server file
│   ├── seed-fixed.js    # Database seeder
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   ├── services/    # API services
│   │   ├── types/       # TypeScript types
│   │   └── App.tsx      # Main App component
│   └── public/          # Static assets
├── .gitignore
├── README.md
├── package.json
└── render.yaml          # Render deployment config
```

## Usage

### 1. Create an Account
1. Navigate to the signup page
2. Fill in your details (name, email, password)
3. Click "Create Account"

### 2. Browse Products
1. Visit the products page
2. Use search to find specific items
3. Apply filters (category, price range)
4. Sort products by various criteria

### 3. Shopping Cart
1. Click "Add to Cart" on any product
2. Navigate to your cart
3. Adjust quantities or remove items
4. Cart persists between sessions

### 4. Account Management
- Your cart persists even after logout/login
- User authentication is handled securely with JWT

## Key Features Implemented

1. **Professional UI**: Clean, modern design with proper spacing, colors, and typography
2. **Authentication**: Secure JWT-based login/signup system
3. **Product Management**: Complete CRUD operations for products
4. **Advanced Filtering**: Category, price range, search, and sorting options
5. **Shopping Cart**: Full cart functionality with persistence
6. **Responsive Design**: Works on desktop, tablet, and mobile
7. **Error Handling**: Proper error messages and loading states
8. **Data Persistence**: Cart items persist between sessions
9. **Security**: Password hashing, JWT tokens, input validation

## Testing the API

You can test the deployed API endpoints:

```bash
# Check if API is running
curl https://e-commerce-ngqq.onrender.com/

# Get all items
curl https://e-commerce-ngqq.onrender.com/api/items

# Get categories
curl https://e-commerce-ngqq.onrender.com/api/items/categories
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in backend
2. **API Connection**: Verify `REACT_APP_API_URL` points to your backend
3. **Database Connection**: Check your MongoDB connection string
4. **Build Failures**: Ensure Node.js version compatibility (>=18.0.0)

### Development vs Production

| Environment | Frontend URL | Backend URL | Database |
|-------------|-------------|-------------|----------|
| Development | http://localhost:3000 | http://localhost:5000 | Local MongoDB |
| Production | https://your-frontend.onrender.com | https://e-commerce-ngqq.onrender.com | MongoDB Atlas |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
