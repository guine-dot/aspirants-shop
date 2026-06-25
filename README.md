# ASPIRANTS.SHOP - Premium Game Top-Up Platform

A full-stack e-commerce platform for buying game top-ups with instant delivery, multiple theme support, and advanced admin features.

## 🚀 Features

### For Users
- ✅ **User Authentication** - Secure registration and email verification
- ✅ **Game Catalog** - Browse 100+ games with multiple top-up packages
- ✅ **Instant Delivery** - Get your top-up within 5-10 minutes
- ✅ **Multiple Themes** - 9 stunning themes to choose from
- ✅ **Order Tracking** - Real-time order status updates
- ✅ **Payment Gateway** - UPI, Credit/Debit cards, Net Banking
- ✅ **QR Code Payments** - Scan and pay easily
- ✅ **Order History** - View all past purchases

### For Admins
- ✅ **Admin Dashboard** - Real-time analytics and insights
- ✅ **Game Management** - Add/edit/delete games and packages
- ✅ **Order Management** - Monitor and manage all orders
- ✅ **User Management** - View and manage users
- ✅ **Revenue Analytics** - Track revenue trends and insights
- ✅ **Banner Management** - Create promotional banners
- ✅ **FAQ Management** - Manage frequently asked questions
- ✅ **Staff Management** - Add and manage admin/moderator accounts

## 📋 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Multer** - File uploads

### Frontend
- **React 18** - UI library
- **Redux** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Recharts** - Charts and graphs
- **React Toastify** - Notifications
- **QRCode.react** - QR code generation

## 📁 Project Structure

```
aspirants-shop/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Game.js
│   │   ├── Package.js
│   │   ├── Order.js
│   │   ├── Banner.js
│   │   ├── FAQ.js
│   │   ├── SiteConfig.js
│   │   ├── Admin.js
│   │   └── Analytics.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminCheck.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── games.js
│   │   ├── orders.js
│   │   ├── upload.js
│   │   └── admin.js
│   ├── controllers/
│   ├── utils/
│   │   └── email.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── GameCard.js
│   │   │   ├── PackageCard.js
│   │   │   └── Alert.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Games.js
│   │   │   ├── GameDetail.js
│   │   │   ├── Checkout.js
│   │   │   ├── Orders.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Profile.js
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   └── admin/
│   │   │       └── AdminDashboard.js
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── themeSlice.js
│   │   │       ├── gameSlice.js
│   │   │       └── orderSlice.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd server
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/aspirants-shop" > .env
echo "JWT_SECRET=your-secret-key" >> .env
echo "EMAIL_USER=your-email@gmail.com" >> .env
echo "EMAIL_PASSWORD=your-app-password" >> .env
echo "PORT=5000" >> .env

# Start the server
npm start
```

### Frontend Setup

```bash
cd client
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

## 📱 Available Themes

1. **Light** - Clean and bright
2. **Dark** - Easy on the eyes
3. **Sakura** - Pink and elegant
4. **Neon** - Bold and futuristic
5. **Emerald** - Fresh and natural
6. **Midnight** - Deep and calm
7. **Ocean** - Cool and serene
8. **Golden** - Warm and luxurious
9. **Gradient** - Vibrant gradient

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get game details
- `GET /api/games/:gameId/packages` - Get game packages

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/theme` - Update theme preference

### Admin
- `GET /api/admin/config` - Get site config
- `PUT /api/admin/config` - Update site config
- `GET /api/admin/analytics/overview` - Get analytics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/games` - Create game
- `PUT /api/admin/games/:id` - Update game
- `DELETE /api/admin/games/:id` - Delete game

## 🎯 Usage Examples

### Register a New User
```javascript
POST /api/auth/register
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create an Order
```javascript
POST /api/orders
Headers: { Authorization: "Bearer <token>" }
Body: {
  "gameId": "game_id",
  "packageId": "package_id",
  "quantity": 1,
  "utrNumber": "123456789"
}
```

## 📊 Database Models

### User
- username (String, unique)
- email (String, unique)
- password (String, hashed)
- phone (String)
- isEmailVerified (Boolean)
- isAdmin (Boolean)
- theme (String)

### Game
- name (String, unique)
- description (String)
- icon (String, URL)
- category (String)
- tags (Array)
- packages (Array of ObjectIds)

### Order
- orderNumber (String, unique)
- user (ObjectId)
- game (ObjectId)
- package (ObjectId)
- totalAmount (Number)
- utrNumber (String)
- orderStatus (String)

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Email verification
- ✅ Admin role-based access control
- ✅ CORS enabled
- ✅ Input validation
- ✅ SQL injection prevention

## 🚀 Deployment

### Deploy Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy!

### Deploy Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set `REACT_APP_API_URL` environment variable
4. Deploy!

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/aspirants-shop
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify IP whitelist in MongoDB Atlas

### CORS Errors
- Check CORS configuration in server.js
- Ensure frontend URL is whitelisted

### Email Not Sending
- Check email credentials in .env
- Enable "Less secure apps" if using Gmail
- Use app-specific passwords for Gmail

## 📞 Support

- Email: support@aspirants.shop
- Phone: +91 9862277104
- WhatsApp: Available 24/7

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for gamers

---

**Happy Gaming! 🎮**
