
# NestJS Portfolio API

## Overview

This is a backend API built using NestJS for managing a portfolio. It connects with Firebase for data storage and uses Multer for file uploads. The API allows for the creation, retrieval, updating, and deletion of portfolio items, including handling image uploads.

## Features

- **Create Portfolio Item**: Add a new portfolio item with an image upload.
- **Get All Portfolio Items**: Retrieve a list of all portfolio items.
- **Get Portfolio Item by ID**: Retrieve details of a single portfolio item by its ID.
- **Update Portfolio Item**: Update an existing portfolio item.
- **Delete Portfolio Item**: Remove a portfolio item by its ID.

## Endpoints

| Method | Endpoint                | Description                                             |
|--------|-------------------------|---------------------------------------------------------|
| POST   | `/portfolio`            | Create a new portfolio item.                            |
| GET    | `/portfolio`            | Retrieve all portfolio items.                           |
| GET    | `/portfolio/:id`        | Retrieve a specific portfolio item by ID.               |
| PUT    | `/portfolio/:id`        | Update a specific portfolio item by ID.                 |
| DELETE | `/portfolio/:id`        | Delete a specific portfolio item by ID.                 |

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node.js comes with npm (Node Package Manager)
- **NestJS CLI**: [Installation Guide](https://docs.nestjs.com/cli/overview)
- **Firebase Admin SDK**: Required for Firebase integration.
- **Multer**: For file uploads.

## Environment Variables

Create a `.env` file in the root of your project with the following environment variables:

```env
BASE_URL=http://localhost:3000
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

Make sure to replace `your_firebase_project_id`, `your_firebase_client_email`, and `your_firebase_private_key` with your actual Firebase credentials.

## Installation

### Clone the Repository

```bash
git clone https://github.com/Octavian47/Portfolio-project.git
cd backend
```

### Install Dependencies

Once inside the project directory, install the required dependencies:

```bash
npm install
```

### Running the Application

To start the NestJS application in development mode:

```bash
npm run start:dev
```

The application will be running at `http://localhost:3000`.

## Testing

To run tests:

```bash
npm run test
```

## Deployment

To build the project for production, run:

```bash
npm run build
```

This will generate the output in the `dist/` directory.


