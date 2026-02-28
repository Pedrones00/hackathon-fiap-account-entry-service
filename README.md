# Account Entry Service

Simple REST API for managing financial account entries (CRUD, filtering, categorization).

## Stack
- Node.js (ES modules)
- Express 5
- Sequelize + SQLite3

## Project structure
```
src/
  config/       # swagger and db setup
  controller/   # express controllers
  middlewares/  # validation & error handling
  model/        # DTOs and sequelize entities
  routes/       # express routes
  service/      # business logic
  utils/
  docs/         # OpenAPI specification (openapi.yaml)
index.js        # main app entrypoint
.env            # variables to run the project
```

## Prerequisites
- Podman (alternatively Docker)

## Running via Podman
Build the container image with:
```bash
podman build -t account-entry-service .
```

Start a temporary container binding port 3001:
```bash
podman run --rm --init -p 3001:3001 --name service-lancamentos account-entry-service
```

The API will be accessible at `http://localhost:3001` and documentation at `http://localhost:3001/docs`.

## Running locally (without container)
Install dependencies:
```bash
npm install
```

Set a `.env` file with:
```
DATABASE_PATH=./storage/database.sqlite
NODE_ENV=development
NODE_PORT=3001
```

Start the server:
```bash
node index.js
```

## API Documentation
The OpenAPI spec is available in `src/docs/openapi.yaml`. Visit `/docs` when the server is running to view the Swagger UI.
