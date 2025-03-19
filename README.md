# Helpdesk Prototype

This is the **frontend** of a Helpdesk system designed to assist company departments in creating and managing support tickets.

## 🚀 Features

- **Stack:** Full-Stack TypeScript with GraphQL
- **Built with:** React + TypeScript
- **API Calls:** Apollo GraphQL
- **Real-time Notifications:** Uses GraphQL subscriptions & Redis
- **Role-based Access Control:** Admins can assign roles to users
- **Ticket Management:**  
  - Create tickets with descriptions, priorities, attachments, and chat logs  
  - Support staff updates ticket status and resolves issues  
  - Users can **rate support performance** (1-5 stars)  
- **Filtering & Dashboard:**  
  - Filter tickets by status, priority, date, etc.  
  - View summary stats via dashboard  
- **User & Group Management:**  
  - Create user groups  
  - Manage departments and ticket categories  
- **Checklists:** Track progress with checklist items inside a ticket  

## 📸 Screenshots

| ![Screenshot 2025-03-13 at 18-01-14 Helpdesk Ticketing System](https://github.com/user-attachments/assets/f4914676-1004-418c-8163-3ef6ad084ad9) | ![zlUbss4Pxl](https://github.com/user-attachments/assets/17991456-45a1-44a9-a89f-4a17b52213ad) | ![hJuOMG0KrH](https://github.com/user-attachments/assets/a01a29ec-59a9-42eb-9800-dc27a4bbcbdd) |
|---|---|---|
| ![Cd0UCL3qP9](https://github.com/user-attachments/assets/21691968-79f2-4945-be3c-4a62aa076134) | ![ZqZPzSrNSh](https://github.com/user-attachments/assets/80e3be0c-b4ec-4330-ab2b-476269368d28) | ![G42epMJBxl](https://github.com/user-attachments/assets/5a24d575-43d5-4236-a262-4443afd5bcea) |
| ![E2jiZQNpUK](https://github.com/user-attachments/assets/5efb771b-e08c-4b03-88d3-0d0e630f864f) |  |  |



---

## 🎯 Live Demo  
🔗 (available [here](https://helpdesk-prototype-frontend.onrender.com))
 
---

## 🏆 My Role  

I was responsible for both **frontend and backend development**. This repository contains the **frontend** part of the project, built with **React + TypeScript**. Backend part (available [here](https://github.com/Usagi5677/helpdesk-prototype-backend)).

Key contributions:
- Implemented UI components and state management
- Integrated **Apollo GraphQL** for API calls
- Developed **real-time notifications** using **GraphQL subscriptions & Redis**
- Designed and implemented **role-based access control**
- Built dashboard features and filtering functionality

---

## 📌 Notes

The backend is required for full functionality.
Redis is needed for real-time notifications.
If you are using a different API URL, update the .env file accordingly.

---

## 📄 License

This project is for portfolio purposes. Do not use it for commercial projects without permission.

---

## 🛠 Setup & Installation

```sh
# Clone the repository
git clone https://github.com/Usagi5677/helpdesk-prototype.git
cd helpdesk-prototype

# Install dependencies
npm install

# Create a .env file in the root directory with the following:
echo "REACT_APP_API_URL=http://localhost:4000/graphql
REACT_APP_WEBSOCKET_URL=ws://localhost:4000/graphql
REACT_APP_RETURN_URL=http://localhost:3002
REACT_APP_APP_ID=
PORT=3002" > .env

# Start the development server
npm run dev
