# Todo List – Full Stack Application

A full-stack Todo List application built with **React**, **ASP.NET Core Web API**, and **MySQL**.

The application allows users to register, log in, and manage tasks through a simple interface. Authentication is implemented using JSON Web Tokens (JWT).

## Technologies

### Frontend
- React
- JavaScript
- Axios
- CSS

### Backend
- C#
- ASP.NET Core (.NET 9)
- Entity Framework Core
- JWT Authentication
- Password Hashing

### Database
- MySQL

## Project Structure

```text
TodoProject/
├── Backend/
├── frontend/
├── database/
│   └── schema.sql
├── .gitignore
└── README.md
```

## Features

- User registration
- Secure password hashing
- User login with JWT authentication
- Protected API endpoints
- Create new tasks
- View all tasks
- Mark tasks as completed or incomplete
- Delete tasks
- Automatic redirect to the login screen when authentication fails

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT |

### Tasks

All task endpoints require JWT authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get all tasks |
| POST | `/items` | Create a task |
| PUT | `/items/{id}?isComplete=true` | Update task completion status |
| DELETE | `/items/{id}` | Delete a task |

## Getting Started

### Prerequisites

Make sure you have installed:

- .NET 9 SDK
- Node.js and npm
- MySQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/racheli878/TodoProject-practicode3.git
cd TodoProject-practicode3
```

### 2. Set Up the Database

Create a MySQL database named `todo`.

Run `database/schema.sql` to create the required tables (`items` and `users`).

### 3. Configure the Backend

Navigate to the backend project:

```bash
cd Backend
```

`appsettings.json` contains placeholders only. Put your real values in `Backend/appsettings.Development.json` (ignored by Git):

```json
{
  "ConnectionStrings": {
    "ToDoDB": "server=localhost;user=YOUR_USER;password=YOUR_PASSWORD;database=todo"
  },
  "Jwt": {
    "Key": "A_LONG_RANDOM_SECRET_AT_LEAST_32_CHARS",
    "Issuer": "TodoApi",
    "Audience": "TodoClient"
  }
}
```

Do not commit database passwords or JWT signing keys to GitHub.

Restore dependencies:

```bash
dotnet restore
```

Start the API:

```bash
dotnet run
```

The API is configured to run locally at:

`http://localhost:5216`

Swagger documentation is available at:

`http://localhost:5216/swagger`

### 4. Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The application will open at:

`http://localhost:3000`

## Authentication Flow

1. A user registers with a username and password.
2. The backend hashes the password before storing it in MySQL.
3. The user logs in with their credentials.
4. The backend validates the credentials and generates a JWT.
5. The frontend stores the JWT in `localStorage`.
6. An Axios request interceptor adds the token to API requests.
7. The backend validates the token before allowing access to protected endpoints.
8. If an API request returns `401 Unauthorized`, the frontend removes the token and returns to the login screen.

## Security

- Passwords are stored as hashes rather than plain text.
- Task endpoints require JWT authentication.
- JWT signatures and expiration times are validated by the backend.
- Sensitive configuration values should remain outside version control.

**Note:** This is an educational project. Tasks are not currently separated by user account.

## Author

GitHub: [racheli878](https://github.com/racheli878)