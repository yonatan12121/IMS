### README for Inventory Management System

# Inventory Management System

This repository contains the backend implementation of an Inventory Management System (IMS). The system enables businesses to effectively track and manage their inventory.

## Features

- User Management: Register and login
- Role-based Access Control: Different access levels for different roles
- Inventory Management: Add, update, and delete inventory items
- Stock Movements: Record purchases, sales, and adjustments
- Reporting: Generate and email inventory and transaction reports
- Notifications: Alert users about low inventory levels and important transactions

## Tech Stack

- Node.js
- Express.js
- MongoDB

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yonatan12121/IMS.git
   cd inventory-management-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## API Documentation

The API documentation is provided using OpenAPI (Swagger). To access the documentation:

1. Run the development server.
2. Navigate to `http://localhost:5000/api-docs`.

## Project Structure

```plaintext
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   └── utils
├── .env
├── .gitignore
├── package.json
└── README.md
```

