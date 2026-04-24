# Notes Management REST API — Assignment 02

A complete **Notes Management REST API** built from scratch using **Node.js + Express + MongoDB (Mongoose)** as part of the Backend with Node.js course.

---

## Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Runtime    | Node.js                  |
| Framework  | Express.js               |
| Database   | MongoDB (via Mongoose)   |
| Dev Tool   | nodemon                  |
| Config     | dotenv                   |

---

## Folder Structure

```
notes-app/
│
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   └── note.model.js       # Mongoose schema
│   ├── controllers/
│   │   └── note.controller.js  # All 19 endpoint handlers
│   ├── routes/
│   │   └── note.routes.js      # Express route definitions
│   ├── middlewares/            # (reserved for future use)
│   ├── app.js                  # Express app setup
│   └── index.js                # Entry point
│
├── .env
├── .env.example
└── package.json
```

---

## Mongoose Schema

```js
const noteSchema = new mongoose.Schema(
  {
    title:    { type: String, required: [true, "Title is required"] },
    content:  { type: String, required: [true, "Content is required"] },
    category: { type: String, enum: ["work", "personal", "study"], default: "personal" },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);
```

---

## Setup & Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd Notes-Management-REST-API

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Fill in your MongoDB URI in .env

# 4. Start dev server
npm run dev

# 5. Start production server
npm start
```

---

## Environment Variables

**.env:**
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notes-db
PORT=5000
```

**.env.example:**
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

---

## Response Format

Every endpoint follows this exact format:

```json
{
  "success": true | false,
  "message": "...",
  "data": {} | [] | null
}
```

- List endpoints include `"count"`.
- Paginated endpoints include `"pagination"`.

---

## HTTP Status Codes

| Code | When Used |
|------|-----------|
| `200` | Successful GET, PUT, PATCH, DELETE |
| `201` | Successful POST |
| `400` | Missing/invalid fields, invalid ObjectId, empty body |
| `404` | Note not found |
| `500` | Server or database error |

---

## All Endpoints

### Section 0 — CRUD

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | `POST` | `/api/notes` | Create a single note |
| 2 | `POST` | `/api/notes/bulk` | Create multiple notes |
| 3 | `GET` | `/api/notes` | Get all notes |
| 4 | `GET` | `/api/notes/:id` | Get note by ID |
| 5 | `PUT` | `/api/notes/:id` | Full replace (all fields) |
| 6 | `PATCH` | `/api/notes/:id` | Partial update (sent fields only) |
| 7 | `DELETE` | `/api/notes/:id` | Delete single note |
| 8 | `DELETE` | `/api/notes/bulk` | Delete multiple notes |

---

### Section 1 — Route Parameters

Route parameters are dynamic segments in the URL path itself (`/path/:param`).

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 9 | `GET` | `/api/notes/category/:category` | Filter by category via route param |
| 10 | `GET` | `/api/notes/status/:isPinned` | Filter by pin status via route param |
| 11 | `GET` | `/api/notes/:id/summary` | Get selected fields only (no content) |

**Example:**
```
GET /api/notes/category/work
GET /api/notes/status/true
GET /api/notes/64b1f2c3.../summary
```

---

### Section 2 — Query Parameters

Query parameters come after `?` in the URL and are used to filter/shape results without changing the route.

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 12 | `GET` | `/api/notes/filter` | Filter by `category` and/or `isPinned` |
| 13 | `GET` | `/api/notes/filter/pinned` | Pinned notes, optionally by category |
| 14 | `GET` | `/api/notes/filter/category` | Filter by category via `?name=` |
| 15 | `GET` | `/api/notes/filter/date-range` | Filter by `?from=` and `?to=` |

**Examples:**
```
GET /api/notes/filter?category=work&isPinned=true
GET /api/notes/filter/pinned?category=study
GET /api/notes/filter/category?name=personal
GET /api/notes/filter/date-range?from=2024-01-01&to=2024-12-31
```

---

### Section 3 — Pagination

Pagination returns results in pages using `page` and `limit` query params.

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 16 | `GET` | `/api/notes/paginate` | Paginate all notes |
| 17 | `GET` | `/api/notes/paginate/category/:category` | Paginate within a category |

**Formula:** `skip = (page - 1) * limit`

**Response includes:**
```json
"pagination": {
  "total": 21,
  "page": 2,
  "limit": 5,
  "totalPages": 5,
  "hasNextPage": true,
  "hasPrevPage": true
}
```

**Examples:**
```
GET /api/notes/paginate?page=1&limit=5
GET /api/notes/paginate/category/work?page=1&limit=3
```

---

### Section 4 — Sorting

Sorting controls the order of results. Client picks the field and direction.

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 18 | `GET` | `/api/notes/sort` | Sort all notes |
| 19 | `GET` | `/api/notes/sort/pinned` | Sort pinned notes only |

**Supported `sortBy` values:** `title`, `createdAt`, `updatedAt`, `category`  
**Supported `order` values:** `asc`, `desc`

**Examples:**
```
GET /api/notes/sort?sortBy=title&order=asc
GET /api/notes/sort?sortBy=createdAt&order=desc
GET /api/notes/sort/pinned?sortBy=title&order=asc
```

---

## Route Order (Important)

Routes are matched **top to bottom** in Express. Static/specific paths MUST come before parameterized ones (like `/:id`) to prevent incorrect matching.

```
✅ CORRECT ORDER in note.routes.js:

POST   /bulk              ← before /:id
DELETE /bulk              ← before /:id
GET    /category/:cat     ← route param section
GET    /status/:isPinned  ← route param section
GET    /filter            ← query param section
GET    /filter/pinned
GET    /filter/category
GET    /filter/date-range
GET    /paginate
GET    /paginate/category/:cat
GET    /sort
GET    /sort/pinned
POST   /                  ← CRUD /:id routes LAST
GET    /
GET    /:id/summary       ← before /:id
GET    /:id
PUT    /:id
PATCH  /:id
DELETE /:id
```

---

## Git Commit History

Each endpoint was committed individually following the mandatory workflow:

| Commit | Endpoint |
|--------|----------|
| `feat: add create note endpoint` | POST /api/notes |
| `feat: add bulk create notes endpoint` | POST /api/notes/bulk |
| `feat: add get all notes endpoint` | GET /api/notes |
| `feat: add get note by ID endpoint` | GET /api/notes/:id |
| `feat: add full replace note endpoint` | PUT /api/notes/:id |
| `feat: add partial update note endpoint` | PATCH /api/notes/:id |
| `feat: add delete single note endpoint` | DELETE /api/notes/:id |
| `feat: add bulk delete notes endpoint` | DELETE /api/notes/bulk |
| `feat: add get notes by category route param endpoint` | GET /api/notes/category/:category |
| `feat: add get notes by pinned status route param endpoint` | GET /api/notes/status/:isPinned |
| `feat: add note summary endpoint with field select` | GET /api/notes/:id/summary |
| `feat: add general filter endpoint with query params` | GET /api/notes/filter |
| `feat: add get pinned notes endpoint` | GET /api/notes/filter/pinned |
| `feat: add filter by category query param endpoint` | GET /api/notes/filter/category |
| `feat: add filter by date range query param endpoint` | GET /api/notes/filter/date-range |
| `feat: add pagination endpoint for all notes` | GET /api/notes/paginate |
| `feat: add pagination by category endpoint` | GET /api/notes/paginate/category/:category |
| `feat: add sort all notes endpoint` | GET /api/notes/sort |
| `feat: add sort pinned notes endpoint` | GET /api/notes/sort/pinned |
