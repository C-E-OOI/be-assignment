## Description:

- User: Need to register first
- One user can have multiple accounts like credit, debit, loan...
- Only user with credit type account to be able to send and withdraw
- User with another account like debit dan loan doesnt have access

## Features:

- Users need to register/log in and then be able to call APIs.
- User can send or transfer balance to another user with same accpunt type [credit]
- APIs to retrieve all accounts and transactions per account of the user.
- Swagger docs for implemented APIs is available localhost:3000/docs

## Tech-stack:

- `Typescript`
- `Fastify` for Backend REST API
- `PostgreSQL` for Database. Iam using DBAS (Database as Service) from Neon Console
- `Prisma` for ORM
- `Docker` for containerization

## How to run:

[local]

- change env.example to .env
- git pull
- npm install
- npm run dev

[docker]

- docker build -t bank-api .
- docker run -p 3000:3000 bank-api
