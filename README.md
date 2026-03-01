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

## Environment variables
- `DATABASE_PATH` — path to the SQLite file (default: `./storage/database.sqlite`).
- `DB_LOGGING` — `true` to enable Sequelize logging, `false` by default.
- `NODE_PORT` — server port (default: `3001`).

## Database schema
Table: `account_entries` (model: `accountEntry`)

Columns and rules:

- `id` (INTEGER)
  - Primary key, auto-increment, not null.
- `cpf` (STRING(11))
  - Not null.
  - Must be exactly 11 numeric characters (`len: [11,11]`, `isNumeric`).
- `agency` (STRING(4))
  - Not null.
  - Must be exactly 4 numeric characters (`len: [4,4]`, `isNumeric`).
- `account` (STRING(10))
  - Not null.
  - 1 to 10 numeric characters (`len: [1,10]`, `isNumeric`).
- `entryName` (STRING(20))
  - Not null.
  - 1 to 20 characters (`len: [1,20]`).
- `value` (DECIMAL)
  - Not null.
  - Represents the monetary amount of the entry.
- `entryType` (STRING)
  - Not null.
  - Allowed values: `DEBIT` or `CREDIT` (`isIn: [['DEBIT','CREDIT']]`).
- `entryTs` (DATE)
  - Not null.
  - Default: `CURRENT_TIMESTAMP` (creation timestamp).
- `isCategorized` (BOOLEAN)
  - Not null.
  - Default: `false`.
- `category` (STRING(50))
  - Nullable.
  - If provided, 1 to 50 characters (`len: [1,50]`).

Notes:

- The project uses Sequelize with SQLite by default (see `src/config/db.js`).
- Sequelize define options: `underscored: true`, `timestamps: true` (adds `created_at` and `updated_at`).
- Default storage file is `./storage/database.sqlite` and can be overridden with `DATABASE_PATH`.

Recommendations for input validation:

- Ensure `entryType` is uppercase or map values before validation (`DEBIT`/`CREDIT`).
