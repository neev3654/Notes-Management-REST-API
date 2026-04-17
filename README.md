# Notes Management REST API 

A clean, production-ready REST API for managing notes built with Node.js, Express, and MongoDB. This project strictly follows the standard HTTP response codes and RESTful conventions, focusing entirely on clean API design, precise routing, and structured database operations.

## Features

- **Standardized REST endpoints:** Complete CRUD implementation.
- **Strict Response Schema**: Every response reliably follows `{ success, message, data }`.
- **Bulk Operations:** Endpoints to create and delete multiple notes simultaneously.
- **Differentiated Updates:** Demonstrates the conceptual distinction between `PUT` (full replacement) and `PATCH` (partial updates).
- **Mongoose Validation:** Robust schema validations enforcing required fields and specific enums.
- **Zero bloat:** No frontend, no auth, no unnecessary middleware—just pure routing, controller logic, and database operations.

## Tech Stack
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API endpoints.
- **MongoDB / Mongoose**: NoSQL database and Object Data Modeling (ODM).
- **Dotenv**: Environment variable management.

---

## Folder Structure

```text
notes-app/
├── src/
│   ├── config/
│   │   └── db.js                # MongoDB connection logic
│   ├── models/
│   │   └── note.model.js        # Mongoose schema and model definition
│   ├── controllers/
│   │   └── note.controller.js   # DB queries, business logic, handling responses
│   ├── routes/
│   │   └── note.routes.js       # Route definitions matched to controller methods
│   ├── middlewares/             # Contains future middleware logic
│   ├── app.js                   # Express application setup
│   └── index.js                 # Server entry point
├── .env.example                 # Example environment variables
└── package.json                 # Project dependencies & scripts
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Database (Local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/neev3654/Notes-Management-REST-API.git
cd Notes-Management-REST-API/notes-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root folder using `.env.example` as a template and provide your MongoDB connection string.
```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

### 4. Start the server
**Development Mode (auto-restarts via nodemon):**
```bash
npm run dev
```
**Production/Standard Mode:**
```bash
npm start
```

---

## API Endpoints Reference

**Base URL:** `/api/notes`

### 1. Create a Note
- **Method:** `POST /`
- **Body:** `{ "title": "Meeting", "content": "Project updates", "category": "work", "isPinned": true }`
- **Success:** `201 Created`

### 2. Bulk Create Notes
- **Method:** `POST /bulk`
- **Body:** `{ "notes": [ { "title": "Note 1", "content": "..." }, { "title": "Note 2", "content": "..." } ] }`
- **Success:** `201 Created`

### 3. Get All Notes
- **Method:** `GET /`
- **Success:** `200 OK`

### 4. Get Note By ID
- **Method:** `GET /:id`
- **Success:** `200 OK`

### 5. Replace a Note Completely
- **Method:** `PUT /:id`
- **Description:** Replaces the entire document. Omitted fields revert to their schema defaults.
- **Success:** `200 OK`

### 6. Update Specific Fields Formally
- **Method:** `PATCH /:id`
- **Description:** Partially updates only the fields provided in the body.
- **Success:** `200 OK`

### 7. Delete a Note
- **Method:** `DELETE /:id`
- **Success:** `200 OK`

### 8. Bulk Delete Notes
- **Method:** `DELETE /bulk`
- **Body:** `{ "ids": [ "64b1f2c3e4d5a...", "..." ] }`
- **Success:** `200 OK`

---

## Validation & Status Codes
This API returns robust, descriptive HTTP status codes:
- **`200 OK`**: Successful `GET`, `PUT`, `PATCH`, `DELETE`.
- **`201 Created`**: Successful creation through `POST`.
- **`400 Bad Request`**: Malformed operations (Missing data, Invalid MongoDB ObjectId, empty bulk arrays).
- **`404 Not Found`**: Document not found for the provided ID.
- **`500 Internal Server Error`**: Unexpected crashes or DB timeouts.

## License
ISC
