# nodejs graphql micorservice template

A Nodejs project template in Typescript to quickly have microservices built using graphql. Mongo db is used as database


## Microservice directory

All microservices are created under `src/`. Example microservice - `src/my-micro-service`

## Creating a new microservice

1. Copy directory my-micro-service into a new directory say `abc-micro-service`
2. Change the `name` field in `package.json` under `abc-micro-service` , to `abc-micro-service`
3. In package.json of the main project, add this `abc-micro-service` as a local file dependency like
   ```jsone

    "dependencies": {    
        "abc-micro-service": "file:src/abc-micro-service",
    }

   ```

## Graphql Schemas

Graphql schemas are under `api-schemas/config.json`


## Microservice Registration

Microservices are served under a specific path , say `/graphql/my-micro-service`. For a microservice
to start up, register it under `src/services/app.ts`

```javascript
import { MAPP as MICROSERVICE1 } from "my-micro-service";

 app.use('/graphql/my-micro-service',
        MICROSERVICE1);

```

## Start the server

```shell
npm install
npm start
```

> this will start server at port 3092

## Test in browser

Test your microservice(ex:`my-micro-service`) in browser by hitting `http://localhost:3092/my-micro-service`

