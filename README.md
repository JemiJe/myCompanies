<div align="center">
  <img src="logo.png" width="150" alt="myCompanies Logo" />
  <h2 align="center" style="margin-top: -3px">Manage your companies</h2>
</div>

## setting up backend

- create your postgreSQL database
- copy `.env.example` and rename it to .env (`/backend` folder)
- fill `.env` with your posgressSQL values, project uses `DB_NAME_DEVELOPMENT` as db name and works on development environment
- then:

### installation

```
cd backend
npm i
npm start
```

### side notes

- admin profile and its default companies created on first server start if didn't present. you can specify admin credentials before server first start in `.env`, or each db `Users` table drop
- postman doc [here](https://documenter.getpostman.com/view/27707755/2s9YeHarFW), doesn't contain all but work in progress
- I worked on project in win 10 x64, PostgreSQL 15.3

## setting up frontend

be sure if you changed port of server you should also change frontend .env variable, for example `VITE_SERVER_API_BASE_URL=http://localhost:[your port]/api/v1/`

### installation

```
cd frontend
npm i
npm run dev
```

## features

- users can sign in/up to app, create/change/delete companies, and update their own profles (including passwords)
- admins can do everything that users can, plus update/delete others profiles, update/delete others companies, see all users and companies in separate tables (admins have additional screen users and users companies)
- tables can be sorted by any value in table head
- to protect admin routes is used protected route, additionally any action to update/delete/get data is verified on server side

## stack

### server

- framwork: Nestjs
- ORM: sequelize
- database: PostgreSQL
- validation: class-validator

### client

- tooling: Vite `reduxjs/redux-templates/packages/vite-template-redux`
- framework: React Typescript
- state managment: Redux toolkit, Redux RTK Query (for API)
- UI: Material UI
- Other: react router dom, toastify
