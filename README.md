## setting up backend

- create your postgreSQL DB
- copy .env.example and rename it to .env
- fill .env with your posgressSQL values
- then:

### installation

```
cd backend
npm i
npm start
```

## setting up frontend

- be sure if you changed port of server you should also change frontend .env variable, for example `VITE_SERVER_API_BASE_URL=http://localhost:[your port]/api/v1/`

### installation

```
cd frontend
npm i
npm run dev
```
