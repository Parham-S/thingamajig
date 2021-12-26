# Full stack JS project

Mostly to learn for myself to understand webpack, OAuth for authentication and social logins, and thoroughly get outside my comfort zone

### General

- JS concepts: async/await
- Tech stack: React, Node.js, Express, MySQL (knex)
- Build tools: yarn, webpack (babel, dev server, fast refresh)

```
.
├── __test__ // Jest test file
├── dist // Automatically generates when you run a prod installation
├── client
│   ├── components
│   ├── contexts
│   ├── hooks
│   ├── pages
│   ├── public
│   └── services
├── server
│   ├── db // knex module
│   │   ├── migrations
│   │   │   └── **.js
│   │   ├── seeds
│   │   │   └── **.js
│   │   └── knexfile.ts // Knex Configuration
│   ├── controllers
│   │   └── **.ts
│   ├── helpers
│   │   └── **.ts
│   ├── models
│   │   └── **.ts
│   ├── routes
│   │   └── **.ts
│   ├── app.ts // Main
│   └── index.ts // Running Sever
├── .env
├── docker-compose.yml
├── Dockerfile
├── jest.config.js // Jest Configuration
├── migrate.sh // Shell migrate Database
└── ...
```

### Backend

- token-based authentication with jsonwebtoken (JWT)
- passport for social logins (github)
- Data validation using joi
- Tests: jest, supertest

Someday: TypeScript? React Query for server cache?

### Frontend

- Concepts:
- webpack (no create-react-app)
- React hooks including useState and useContext, custom hooks
- react-router-dom (v6)
- Uses Pico CSS to emphasize basics w/o it looking jank

### Setting up GitHub social logins

- Go to <a href="https://github.com/settings/profile" target="_blank">Account Settings</a>
- Select **Developer settings** from the sidebar
- Then click on **OAuth Apps** and then on **Register new application**
- Enter _Application Name_ and _Homepage URL_
- For _Authorization Callback URL_: http://localhost:8080/auth/github/callback
- Click **Register application**
- Copy and paste _Client ID_ and _Client Secret_ keys into `.env` file

### Dev Environment Instructions

#### Option 1

```zsh
$ cp server/.env.sample server/.env # add local DB info for dev and test environments

# don't forget to use MySQL or a visualizer to create a dev DB

$ yarn
$ yarn dev

# to run integration tests
$ yarn test
```

#### Option 2: Docker

```zsh
# Build and run docker containers
$ docker-compose build
$ docker-compose up

# Stop all running containers
$ docker-compose down
```

### Production

FIXME: make required to use node v16 (because of jest-extend)
FIXME: add note about heroku
FIXME: add note about adding JAWS MySQL to heroku

## REST API endpoints

## DB schema

users

- id (as a UUID)
- user_name (unique)
- password_hash
- email

profiles

- id (as a UUID)
- user_id (FK)
- first_name
- last_name
- avatar

provider_accounts

- id (as a UUID)
- user_id (FK)
- provider_type (enum of 'github', etc)
- provider_id

## Resources

- https://github.com/crsandeep/simple-react-full-stack/
- https://github.com/sahat/hackathon-starter
- https://github.com/munirapp/express-standard-api
- https://github.com/bezkoder/react-jwt-auth
- https://javascript.plainenglish.io/react-fast-refresh-the-new-react-hot-reloader-652c6645548c - webpack hot refresh
- https://medium.com/@divee789/what-should-i-put-in-a-jwt-payload-3cb448c160c1 - don't put mutabile data in jwt payload
- https://fatmali.medium.com/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32

Testing

- https://www.taniarascia.com/integration-testing-with-jest-typescript-objection/

To read

- https://github.com/gilamran/fullstack-typescript
- https://www.freecodecamp.org/news/a-better-way-to-structure-react-projects/
- https://www.izertis.com/en/-/refresh-token-with-jwt-authentication-in-node-js
- https://www.testim.io/blog/how-to-test-oauth-authentication/
- https://medium.com/chingu/mocking-passport-githubstrategy-for-functional-testing-33e7ed4f9aa3
- https://abhishekch09.medium.com/social-authentication-with-node-js-passport-and-jwt-in-spa-493e0d6fdc05

To investigate

- https://github.com/scopsy/await-to-js
- https://www.shanestillwell.com/2018/06/29/setting-up-knex-project/
- https://mherman.org/blog/developing-microservices-node-react-docker/
- https://jdlm.info/articles/2019/10/19/testing-node-docker-compose-backend.html

Docker links

- https://towardsdatascience.com/deploying-a-react-nodejs-application-with-docker-part-i-of-ii-910bc6edb46e
- https://github.com/thomasboel/Docker-Setup-react-express-mysql
- https://github.com/dylane1999/SentimentAnalysisApp
- https://github.com/BretFisher/node-docker-good-defaults
- https://nickjanetakis.com/blog/best-practices-around-production-ready-web-apps-with-docker-compose
  - https://github.com/nickjj/docker-node-example/blob/main/Dockerfile

```bash
# Build docker containers locally
$ docker-compose up -d --build

# Run migrations and seed
$ docker exec fullstack-app yarn db:migrate

# or...
$ docker-compose exec web yarn db:migrate
```

- CLI into the fullstack-js container (via the Docker Desktop or otherwise) and run `yarn db:migrate`
  - Use the `env` command inside the shell to see environment variables.

```bash
# Log into docker database,

# user: user
$ docker exec -it sample-fullstack-hooks-asyncawait_db_1 mysql -h db -u user -p

# user: root; pw is password
$ docker exec -it sample-fullstack-hooks-asyncawait_db_1 mysql -h db -u root -p
```

```
docker system prune -a
docker volume prune
```

Note to self for creating new migration files:
`knex migrate:make provider_accounts --knexfile db/knexfile.js`
