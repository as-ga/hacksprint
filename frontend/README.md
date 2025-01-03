# My Next.js and Flask App

This project is a full-stack application that uses Next.js for the frontend and Flask for the backend. Below are the instructions for setting up and running both parts of the application.

## Frontend (Next.js)

### Prerequisites

- Node.js (version 12 or later)
- npm (Node package manager)

### Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to view the application.

### Folder Structure

- `pages/`: Contains the pages of the application.
- `public/`: Static assets such as images and fonts.
- `styles/`: Global CSS styles.

## Backend (Flask)

### Prerequisites

- Python (version 3.6 or later)
- pip (Python package installer)

### Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```
   python app.py
   ```

4. The API will be available at `http://localhost:5000`.

## Notes

- Ensure that both the frontend and backend servers are running simultaneously for the application to function correctly.
- Modify the API endpoints in the frontend as needed to match your Flask backend routes.