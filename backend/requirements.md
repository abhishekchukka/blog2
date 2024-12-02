# Personal Blog Platform Deployment

This document outlines the step-by-step approach to develop, deploy, and document a personal blog platform.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Development Steps](#development-steps)
   - [Frontend Implementation](#frontend-implementation)
   - [Backend Implementation](#backend-implementation)
4. [Azure Deployment](#azure-deployment)
5. [Testing and Monitoring](#testing-and-monitoring)
6. [Documentation](#documentation)
7. [Submission Checklist](#submission-checklist)

---

## Introduction

The goal is to create and deploy a simple personal blog platform that showcases your web development, cloud deployment, and system configuration skills.

---

## Features

### Frontend

- Homepage displaying blog posts
- Simple post creation form
- Responsive design
- Navigation menu

### Backend

- REST API with the following endpoints:
  - `GET /api/posts`: List all posts
  - `POST /api/posts`: Create a new post
  - `GET /api/posts/{id}`: Retrieve a single post
- Basic authentication

---

## Development Steps

### Frontend Implementation

1. **Set up the frontend environment:**

   - Use React for the frontend.
   - Install dependencies:
     ```bash
     npx create-react-app blog-frontend
     cd blog-frontend
     npm install axios react-router-dom
     ```

2. **Create the required components:**

   - `HomePage.js`: Displays a list of blog posts fetched from the backend.
   - `CreatePost.js`: Form for creating a new blog post.
   - `NavBar.js`: Responsive navigation menu.
   - Implement basic routing with `react-router-dom`.

3. **Styling:**

   - Use CSS3 or Tailwind CSS for a responsive layout.
   - Ensure mobile-friendliness with media queries or Tailwind utilities.

4. **API Integration:**

   - Use `axios` to interact with the backend endpoints.
   - Example:
     ```javascript
     axios
       .get("/api/posts")
       .then((response) => console.log(response.data))
       .catch((error) => console.error(error));
     ```

5. **Test the frontend:**
   - Verify API calls and UI responsiveness.

---

### Backend Implementation

1. **Set up the backend environment:**

   - Use Node.js and Express for backend development.
   - Install dependencies:
     ```bash
     npm init -y
     npm install express body-parser cors dotenv
     ```

2. **Create REST API endpoints:**

   - `GET /api/posts`: Return all posts from in-memory storage.
   - `POST /api/posts`: Add a new post to the storage.
   - `GET /api/posts/{id}`: Fetch a specific post by ID.
   - Use a simple in-memory data structure for storage.

3. **Add Basic Authentication:**

   - Use `express-basic-auth` for basic authentication:
     ```bash
     npm install express-basic-auth
     ```

4. **Run and Test:**
   - Start the server:
     ```bash
     node server.js
     ```
   - Use tools like Postman to test API endpoints.

---

## Azure Deployment

### 1. Set Up Azure App Service

1. **Create a new App Service:**

   - Log into the Azure portal.
   - Navigate to _App Services_ > _Create_.
   - Select a free tier for initial deployment.

2. **Deploy the frontend:**
   - Build the React app:
     ```bash
     npm run build
     ```
   - Deploy the `build` folder using Azure App Service.

### 2. Deploy Backend

1. **Prepare the backend for deployment:**

   - Add `start` script in `package.json`:
     ```json
     "scripts": {
       "start": "node server.js"
     }
     ```
   - Ensure all environment variables are handled securely.

2. **Deploy the backend to Azure:**
   - Use Azure CLI or portal to deploy the backend service.

### 3. Optional: Set Up Azure SQL Database

1. **Create a new Azure SQL Database:**

   - Navigate to _Azure SQL_ > _Create Database_.
   - Use it to replace in-memory storage.

2. **Connect backend to Azure SQL:**
   - Install `mssql` package for Node.js:
     ```bash
     npm install mssql
     ```
   - Update your API to use SQL queries.

---

## Testing and Monitoring

1. **Set up basic monitoring:**

   - Enable Application Insights in Azure App Service for performance tracking.
   - Monitor API and frontend requests via Azure portal.

2. **Manual Testing:**
   - Test UI responsiveness and API endpoints.
   - Check deployment status on the live URL.

---

## Documentation

### 1. Project Setup Instructions

- Clone the repository:
  ```bash
  git clone <repo-url>
  cd <project-folder>
  ```
