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

_Add screenshots here to showcase the UI._

---

## 🎯 Live Demo  
🔗 [Live Demo Link](#) _(If hosted, replace with the actual URL)_

---

## 🏆 My Role  

I was responsible for both **frontend and backend development**. This repository contains the **frontend** part of the project, built with **React + TypeScript**.  
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
