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
- Personal task list for each user
- Create new tasks
- View your tasks
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

All task endpoints require JWT authentication. Each user only sees and changes their own tasks; the user is identified by the `sub` claim of the token.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get the current user's tasks |
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

If your database was created from an older version of `schema.sql` (before tasks were linked to users), run `database/migrations/001_add_user_to_items.sql` once instead. Tasks created before the migration have no owner and will not appear for any user.

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

### API URL

The frontend reads the backend address from the `REACT_APP_API_URL` environment variable and falls back to `http://localhost:5216` when it is not set (see `frontend/.env.example`).

When deploying the frontend (e.g. on Render), set `REACT_APP_API_URL` to the deployed backend URL. The variable is read at build time, so redeploy after changing it.

### Running the Backend with Docker

The backend includes a `Dockerfile` (in `Backend/`). Build and run it:

```bash
cd Backend
docker build -t todoapi .
docker run -p 8080:8080 -e ConnectionStrings__ToDoDB="server=HOST;user=USER;password=PASSWORD;database=todo" -e Jwt__Key="A_LONG_RANDOM_SECRET_AT_LEAST_32_CHARS" -e Jwt__Issuer=TodoApi -e Jwt__Audience=TodoClient todoapi
```

The API listens on the port given in the `PORT` environment variable, or `8080` if it is not set. Configuration is passed as environment variables (`__` replaces `:` in setting names). `appsettings.Development.json` is excluded from the image.

To deploy on Render, create a **Web Service** with **Docker** as the runtime, set the root directory to `Backend`, and add the environment variables above. The MySQL database must be hosted separately, since Render does not offer managed MySQL.

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

- Each task belongs to a user, and the API only returns or changes the logged-in user's tasks.

## Author

GitHub: [racheli878](https://github.com/racheli878)