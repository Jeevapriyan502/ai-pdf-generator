# AI PDF Generator

## Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies (already done):
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
   The backend will run on http://localhost:3001

## Frontend

1. Open `frontend/index.html` in your browser (double-click or use Live Server extension in VSCode).
2. Use the login form (username: `user`, password: `password`).
3. After login, enter content and generate a PDF.

## Auth Flow
- **POST /login**: Returns JWT if credentials match (hardcoded user).
- **POST /generate-pdf**: Requires JWT. Generates and downloads PDF.
- If not logged in, PDF generation is blocked.

## Testing
- Use the frontend or Postman to test login and PDF generation.
- Try generating a PDF without logging in — it should be blocked. 