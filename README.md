# Tasks App

Built with TypeORM & Express, this Tasks App API is a robust backend solution designed to manage tasks efficiently. Leveraging powerful technologies, it provides a comprehensive environment for developers to interact with task data.

## Technologies Used

- 🟦 [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- ⌨️ [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
- ▲ [TypeORM](https://typeorm.io/) - An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript.
- ⚡️ [Swagger](https://swagger.io/) - A set of tools for designing, building, and documenting RESTful APIs.
- 🐘 [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.

## Getting Started

Follow these steps to get your development environment set up:

1. **Clone the repository and navigate to the folder:**

    ```bash
    git clone https://github.com/awais0198/tasks-app.git
    cd typeorm-tasks-app
    ```

2. **Create a `.env` file in the root folder and set the variables as shown in `.env.example`:**

    ```plaintext
    PORT=8000
    DB_HOST=localhost
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=tasks_app
    ```

3. **Create a Postgres Database named `tasks_app`:**

    ```bash
    psql postgres
    CREATE DATABASE tasks_app;
    ```

## Development

To start development, follow these steps:

```bash
npm install
npm run db:migrate
npm start
```

After running the migration, an Admin user will be created with the following credentials:

Email: admin@gmail.com
Password: admin
The server will start on PORT 8000.

To check the API's Swagger Documentation, navigate to http://localhost:8000/api-docs/ to access the Swagger UI. Here, you'll find detailed information about the available endpoints and how to interact with them.

Endpoints marked with a 🔓 icon require a JWT token for access. You can set this token in the Authorize tab within Swagger UI.
