# Todo App

A simple full-stack Todo application with Node.js backend and vanilla JavaScript frontend.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Real-time updates
- Responsive design

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: HTML, CSS, JavaScript

## Quick Start

1. **Clone and setup backend**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file in backend folder**
   ```
   MONGO_URI=mongodb://localhost:27017/todos
   PORT=5000
   ```

3. **Start backend server**
   ```bash
   npm start
   ```

4. **Open frontend**
   - Open `frontend/index.html` in your browser
   - Or access it using VS code live server

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo
