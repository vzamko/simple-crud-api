# simple-crud-api

### Deploy:
Run `npm install` or `yarn`.

### Start server:
Run server in one of mode:
1. Production: `npm run start:prod` or `yarn start:prod`.
2. Development: `npm run start:dev` or `yarn start:dev`.

Use `.env` file to enter port.

### Testing:
1. Run `npm run test` or `yarn test` for testing.

### Use:
I recommend to use Postman for using API.

### Description: 
1. The task must be solved using only **pure Node.js**. Any libraries and packages (except `nodemon`, `eslint` and its plugins, `prettier` and its plugins, `uuid`, `webpack` and its plugins, testing tools, `dotenv`, `cross-env`) **are prohibited**.
2. API path `/person`:
    * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
3. Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
4. Requests to non-existing endpoints (e.g. `/some-non/existing/resource`) should be handled.
5. Internal server errors should be handled and processed correctly.
6. Value of port on which application is running should be stored in `.env` file.
7. There should be 2 modes of running application: **development** and **production**
8. There could be some tests for API.
