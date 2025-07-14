# 📚 Library Management System API

A backend RESTful API for managing books and borrow operations in a library. Built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

## 🚀 Features

- ✅ Book CRUD operations
- ✅ Borrow book functionality with availability logic
- ✅ Borrow summary using MongoDB aggregation
- ✅ Filtering, sorting, and pagination
- ✅ Schema validation with Mongoose
- ✅ Static/instance method usage
- ✅ Mongoose middleware
- ✅ Consistent error handling

---

## 📦 Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Validation**: Mongoose schema validation

---

## 📁 Project Structure
```
src/
├── app.ts                  # Express app setup
├── server.ts               # App entry point

├── modules/
│
│ ├── book/                 # 📚 Book feature (CRUD + filter/sort)
│ │   ├── book.model.ts         # Book schema/model
│ │   ├── book.interface.ts     # TypeScript interface for Book
│ │   ├── book.controller.ts    # Book controller logic
│ │   └── book.routes.ts        # Book route definitions
│
│ ├── borrow/               # 📦 Borrowing logic (business rules + aggregation)
│ │   ├── borrow.model.ts       # Borrow schema/model
│ │   ├── borrow.interface.ts   # TypeScript interface for Borrow
│ │   ├── borrow.controller.ts  # Borrow controller logic
│ │   └── borrow.routes.ts      # Borrow route definitions
│
│ ├── user/                 # 👤 User management (optional feature)
│ │   ├── user.model.ts         # User schema/model
│ │   ├── user.interface.ts     # TypeScript interface for User
│ │   ├── user.controller.ts    # User controller logic
│ │   └── user.routes.ts        # User route definitions
│
└── ...
```


## ⚙️ Project Setup Instructions


1. **Initialize the project:**

```bash
npm init -y
```

2. **Initialize TypeScript:**

```bash
tsc --init
```

3. **Install dependencies:**

```bash
npm install express cors mongoose dotenv
```

4. **Install development dependencies:**

```bash
npm install --save-dev ts-node-dev @types/express @types/cors
```

5. **Update your `package.json` scripts:**

```json
"scripts": {
  "start": "ts-node-dev --respawn --transpile-only ./src/server.ts"
}
```

6. **Start the development server:**

```bash
npm run start
```


---

## 📘 API Endpoints

---

### 📚 Books

#### ➕ Create Book

**POST** `/api/books`

**Request Body**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Response**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

---

#### 📖 Get All Books

**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

**Query Parameters**
- `filter`: Filter by genre  
- `sortBy`: Field to sort (e.g., `createdAt`)  
- `sort`: `asc` or `desc`  
- `limit`: Number of results (default: `10`)

**Response**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}
```

---

#### 🔍 Get Book by ID

**GET** `/api/books/:bookId`

**Response**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { ... }
}
```

---

#### ✏️ Update Book

**PUT** `/api/books/:bookId`

**Request Body**
```json
{
  "copies": 50
}
```

**Response**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

#### ❌ Delete Book

**DELETE** `/api/books/:bookId`

**Response**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 📦 Borrow

#### ✅ Borrow a Book

**POST** `/api/borrow`

**Business Logic**
- Checks if book has enough copies
- Deducts quantity from `copies`
- Updates `available` to `false` if copies become 0

**Request Body**
```json
{
  "book": "BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Response**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

---

#### 📊 Borrow Summary (Aggregation)

**GET** `/api/borrow`

**Response**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---

### ❗ Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

### ✅ Project Completion Checklist

- [x] Express + TypeScript setup
- [x] MongoDB + Mongoose integration
- [x] Book model with validation
- [x] Borrow logic with business rules
- [x] Aggregation summary
- [x] Static methods / Middleware
- [x] Query filtering and sorting
- [x] Matching response formats
- [x] Error structure conforms to spec
