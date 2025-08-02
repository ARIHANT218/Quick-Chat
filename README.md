# 💬 Quick Chat

**Quick Chat** is a full-stack real-time chat application with secure authentication and MongoDB integration. It enables users to engage in live, instant messaging with a smooth and responsive interface — ideal for both desktop and mobile users.


---

## 🚀 Features

- 🔐 **Secure Authentication**  
  User registration and login using **JWT-based authentication**

- 💬 **Real-Time Messaging**  
  Send and receive messages instantly using **WebSockets** or **REST APIs**

- 🧑‍🤝‍🧑 **Multi-User Support**  
  Seamless communication between multiple users

- 🔄 **Live Message Updates**  
  Messages appear instantly without refreshing the page

- 🧾 **Persistent Storage**  
  Chat history is saved using **MongoDB**

- 📱 **Responsive UI**  
  Built with **React** and **Tailwind CSS** to ensure a smooth experience across all devices

---

## 🛠 Tech Stack

| Layer       | Technologies                                 |
|-------------|----------------------------------------------|
| **Frontend** | React.js, Tailwind CSS                      |
| **Backend**  | Node.js, Express.js                         |
| **Auth**     | JWT (JSON Web Tokens)                       |
| **Database** | MongoDB (via Mongoose ODM)                  |
| **Realtime** | Socket.io (or REST API fallback)            |
| **Hosting**  | Suitable for Render, Vercel, or Railway     |


---

## 📦 Getting Started

### 1. Clone the Repository

git clone https://github.com/ARIHANT218/Quick-Chat.git


---

📁 Project Structure


Quick-Chat/

├── client/     # Frontend application built with React and Tailwind CSS

│   ├── public/            # Static assets

│   ├── src/               # Source code for React app

│   │   ├── components/    # Reusable UI components (ChatBox, MessageList, etc.)

│   │   ├── pages/         # Page-level components (Login, Register, Chat, etc.)

│   │   ├── services/      # API calls and utility functions

│   │   ├── App.js         # Main React component

│   │   └── index.js       # Entry point

│   └── package.json       # Frontend dependencies and scripts

├── server/                # Backend application using Node.js and Express.js

│   ├── config/            # Configuration files (e.g., DB connection)

│   ├── controllers/       # Controller logic for handling requests

│   ├── models/            # Mongoose schemas and models (User, Message)

│   ├── routes/            # API route definitions (auth, chat, users)

│   ├── middleware/        # Custom middleware (auth check, error handler)

│   ├── server.js          # Entry point of the backend

│   └── package.json       # Backend dependencies and scripts
│
├── .env.example           # Sample environment variables file

├── README.md              # Project documentation

└── LICENSE                # Project license (e.g., MIT)




🤝 Contributing


Contributions are welcome! Please open issues or submit a pull request to suggest improvements or report bugs.
