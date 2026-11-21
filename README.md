🚀 Lead Manager

A modern and responsive Full Stack Lead Management System built using React, Node.js, Express.js, and MongoDB.

Lead Manager helps users manage business leads efficiently with an intuitive dashboard, lead tracking, search, filtering, and CRUD operations.

✨ Features

- 📊 Dashboard with lead statistics
- ➕ Add new leads
- 📋 View all leads
- ✏️ Edit existing leads
- 🗑️ Delete leads with confirmation
- 🔍 Search leads by name, email, and company
- 🎯 Filter leads by status
- 📱 Responsive user interface
- ✅ Form validation
- 🔐 Backend error handling
- 🗄️ MongoDB database integration

🛠️ Tech Stack

Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router DOM
- Lucide React

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- dotenv
- CORS

📂 Project Structure

LEAD-MANAGER/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── .gitignore
└── README.md

⚙️ Installation & Setup

1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate to Project Folder

cd LEAD-MANAGER

3. Setup Backend

cd backend
npm install

Create a ".env" file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the backend:

npm start

If your package.json does not have a start script, use:

node server.js

4. Setup Frontend

Open another terminal:

cd frontend
npm install

Create a ".env" file:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Open the local URL displayed by Vite.

🔗 API Endpoints

Method| Endpoint| Description
GET| "/api/leads"| Get all leads
GET| "/api/leads/stats"| Get lead statistics
GET| "/api/leads/:id"| Get lead by ID
POST| "/api/leads"| Create a new lead
PUT| "/api/leads/:id"| Update a lead
DELETE| "/api/leads/:id"| Delete a lead

📌 Lead Status

Each lead can have one of the following statuses:

- New
- Contacted
- Qualified
- Lost

📊 Dashboard

The dashboard provides an overview of:

- Total Leads
- New Leads
- Contacted Leads
- Qualified Leads
- Lost Leads

🔒 Environment Variables

For security, never upload your ".env" files or sensitive credentials to GitHub.

Add the following to ".gitignore":

node_modules/
.env
dist/
build/

🎯 Project Objective

The main objective of this project is to build a practical Full Stack application that demonstrates frontend development, REST API integration, backend development, database management, and CRUD operations.

👨‍💻 Author

Ajit Prajapati

Full Stack Developer

- GitHub: "ajit9129353710" (https://github.com/ajit9129353710)
- LinkedIn: "Ajit Prajapati" (https://www.linkedin.com/in/ajit-prajapati-50323442a/)

⭐ Support

If you find this project useful, consider giving it a star on GitHub!

