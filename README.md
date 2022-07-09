### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

========== ENDPOINTS ==========

===============================
Registration request:

POST /users/signup

RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
===============================

===============================
Login request:

POST /users/login

RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
===============================

===============================
Logout request:

GET /users/logout

# Authorization: "Bearer {{token}}"

===============================
Current user request:

GET /users/current

Authorization: "Bearer {{token}}"
