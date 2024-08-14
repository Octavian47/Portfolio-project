# Portfolio Project

## Overview

This project is a portfolio website built with React. The application allows users to showcase their portfolio items, manage them through a dashboard, and view the live portfolio. The app includes a backend (not covered in this README) for managing the portfolio items via an API.

## Features

- **Dashboard**: Manage your portfolio items. You can add, edit, delete, and toggle the visibility of each item.
- **Add Portfolio Item**: A dedicated page for adding new portfolio items.
- **Live Portfolio**: A view-only page where users can see the public portfolio.

## Pages & Routes

| Route                  | Description                                                            |
|------------------------|------------------------------------------------------------------------|
| `/`                    | Home page showing the visible portfolio items.                         |
| `/dashboard`           | Admin dashboard to manage portfolio items.                             |
| `/portfolio/add`       | Page to add new portfolio items.                                       |    |       |

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node.js comes with npm (Node Package Manager)
- **Git**: [Download and install Git](https://git-scm.com/)

### Clone the Repository

To get started with the project, you need to clone the repository from GitHub. Run the following commands in your terminal:
To get started with the project, you need to clone the repository from GitHub. Run the following commands in your terminal:

```bash
git clone https://github.com/Octavian47/portfolio-project.git
cd portfolio-project/frontend
```

### Install Dependencies

Once you've navigated to the project directory, install the required dependencies using npm:

\`\`\`bash
npm install
\`\`\`

This will install all the necessary packages listed in the \`package.json\` file.

### Running the Application

To start the development server, use the following command:

\`\`\`bash
npm start
\`\`\`

This command will start the application and open it in your default web browser. The app will be accessible at \`http://localhost:3000/\`.

### Running Tests

To run the tests for the project, use the following command:

\`\`\`bash
npm test
\`\`\`

This will run all the tests in watch mode. You can press \`a\` to run all tests or \`q\` to quit the test runner.