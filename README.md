# E-Commerce Application

A full-stack e-commerce web application built with React.js (frontend) and Express.js (backend), featuring user authentication, product management, shopping cart functionality, and more.

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

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation & Setup

### 1. Clone or Download
Download the project to your local machine.

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (already created):
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

### 4. Database Setup

Start MongoDB service on your machine. The application will create the database automatically.

To populate the database with sample products, run:
```bash
cd backend
node seed.js
```

## Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on http://localhost:5000

### 2. Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will start on http://localhost:3000

### 3. Access the Application

Open your browser and navigate to http://localhost:3000

## Application Structure

```
e-commerce/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Main server file
│   ├── seed.js          # Database seeder
│   └── .env             # Environment variables
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── contexts/    # React contexts
    │   ├── services/    # API services
    │   ├── types/       # TypeScript types
    │   └── App.tsx      # Main App component
    └── public/          # Static assets
```

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

## Production Deployment

For production deployment:

1. Set up environment variables for production
2. Use a production MongoDB instance (MongoDB Atlas)
3. Build the frontend: `npm run build`
4. Serve the built files through your backend or CDN
5. Set up proper security headers and HTTPS

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## License

This project is open source and available under the MIT License.
