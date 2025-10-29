# 🛒 Vibe Commerce – Mock E-Commerce Cart

A full-stack **shopping cart web app** built for the **Vibe Commerce screening assignment**.  
This app simulates a basic e-commerce flow — browse products, add/remove items from cart, view totals, and perform a mock checkout.  
No real payments are integrated.

---

## 🚀 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite) + Axios + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (cloud-hosted) |
| **API Communication** | REST API |
| **Deployment** | GitHub-hosted Monorepo |

---

## 📁 Project Structure

vibe-commerce/
├── backend/
│ ├── server.js
│ ├── routes/
│ │ ├── productRoutes.js
│ │ └── cartRoutes.js
│ ├── controllers/
│ ├── models/
│ ├── db.js
│ ├── seed.js
│ ├── package.json
│ └── .env.example
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ProductList.jsx
│ │ │ ├── Cart.jsx
│ │ │ └── CheckoutModal.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ └── Checkout.jsx
│ │ ├── api/api.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
└── README.md

yaml
Copy code

---

## 🧩 Features

### 🖥️ Frontend (React)
- Products grid with “Add to Cart” buttons  
- Cart view: shows items, quantities, totals, and allows removal  
- Mock checkout form (name/email) → receipt modal on submit  
- Responsive layout for desktop & mobile  
- API integration with backend (via Axios)

### ⚙️ Backend (Node.js + Express)
- **GET /api/products** → Returns 5–10 mock products  
- **POST /api/cart** → Add product to cart  
- **GET /api/cart** → Get all cart items + total price  
- **DELETE /api/cart/:id** → Remove item from cart  
- **POST /api/checkout** → Generate mock receipt (total + timestamp)  
- MongoDB Atlas persistence for products & cart  
- Clean modular routes, controllers, and models

---

## 🔐 Environment Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/vibe-commerce.git
cd vibe-commerce
2. Setup backend
bash
Copy code
cd backend
cp .env.example .env
Update .env:

env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.umreaar.mongodb.net/vibe_commerce?retryWrites=true&w=majority
PORT=5000
3. Install backend dependencies
bash
Copy code
npm install
4. Seed mock products
bash
Copy code
npm run seed
5. Run backend server
bash
Copy code
npm run dev
Server runs at: http://localhost:5000

6. Setup frontend
bash
Copy code
cd ../frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

📡 API Endpoints
Method	Route	Description
GET	/api/products	Fetch mock products
POST	/api/cart	Add product to cart
GET	/api/cart	Get cart + total
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Mock checkout receipt

🧾 Example API Response
/api/products
json
Copy code
[
  {
    "_id": "67481a2e9f6a5b2b2432c911",
    "name": "Wireless Headphones",
    "price": 49.99
  },
  {
    "_id": "67481a2e9f6a5b2b2432c912",
    "name": "Smartwatch",
    "price": 89.99
  }
]
/api/checkout
json
Copy code
{
  "message": "Checkout successful",
  "total": 139.98,
  "timestamp": "2025-10-29T07:24:12.000Z"
}
