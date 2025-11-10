# Todo API

A RESTful API for managing todos built with Node.js, Express.js, TypeScript, and Prisma with SQLite database.

## Features

- ✅ Full CRUD operations for todos
- 📝 TypeScript for type safety
- 🗄️ SQLite database with Prisma ORM
- 🛡️ Error handling middleware
- 📊 Request logging
- 🔄 Hot reload in development
- 🎯 Clean architecture with controllers and routes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: Prisma 6.19.0
- **Dev Tools**: tsx (TypeScript execution)

## Project Structure

```
src/
├── server.ts              # Main application entry point
├── db.ts                  # Database connection
├── prisma.config.ts       # Prisma configuration
├── controllers/
│   └── todoController.ts  # Todo business logic
├── routes/
│   └── todoRoutes.ts      # API route definitions
├── middleware/
│   ├── errorHandler.ts    # Global error handling
│   ├── logger.ts          # Request logging
│   └── notFoundError.ts   # 404 handler
├── utils/
│   └── errorWithStatus.ts # Custom error class
└── generated/
    └── prisma/            # Generated Prisma client
prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd myAPI
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env file in the root directory
echo "DATABASE_URL=\"file:./dev.db\"" > .env
echo "PORT=3000" >> .env
```

4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### Running the Application

#### Development Mode (with hot reload)
```bash
npm run start:dev
```

#### Production Build
```bash
# Build the project
npm run build

# Start the built application
node dist/server.js
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api/todos
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/todos` | Get all todos | - |
| GET | `/api/todos/:id` | Get todo by ID | - |
| POST | `/api/todos` | Create a new todo | `{ "title": "string" }` |
| PUT | `/api/todos/:id` | Update entire todo | `{ "title": "string", "completed": boolean }` |
| PATCH | `/api/todos/:id` | Partially update todo | `{ "title"?: "string", "completed"?: boolean }` |
| DELETE | `/api/todos/:id` | Delete todo | - |

### Example Requests

#### Create a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn TypeScript"}'
```

#### Get All Todos
```bash
curl http://localhost:3000/api/todos
```

#### Update Todo Status
```bash
curl -X PATCH http://localhost:3000/api/todos/:id \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

#### Delete a Todo
```bash
curl -X DELETE http://localhost:3000/api/todos/:id
```

### Response Format

#### Success Response
```json
{
  "id": "clxxxxx...",
  "title": "Learn TypeScript",
  "completed": false,
  "createdAt": "2025-11-10T09:02:36.000Z",
  "updatedAt": "2025-11-10T09:02:36.000Z"
}
```

#### Error Response
```json
{
  "error": "Error message",
  "status": 400
}
```

## Database Schema

The Todo model includes:

- `id`: String (CUID) - Primary key
- `title`: String - Todo title
- `completed`: Boolean - Completion status (default: false)
- `createdAt`: DateTime - Creation timestamp
- `updatedAt`: DateTime - Last update timestamp

## Development

### Database Management

#### View Database
```bash
npx prisma studio
```

#### Reset Database
```bash
npx prisma migrate reset
```

#### Create New Migration
```bash
npx prisma migrate dev --name your_migration_name
```

### Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm test` - Run tests (not implemented yet)

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

All errors follow a consistent format with appropriate HTTP status codes.

## Logging

All requests are logged with:
- HTTP method
- Request URL
- Response status code
- Response time

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request