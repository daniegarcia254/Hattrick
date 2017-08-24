# Loopback-API-Hattrick
Example of a **Loopback REST API** that can be used as base for a community game where users can register, login, join to differents communities, post comments, etc.

Initially the API was created to be used in a game (_Hattrick_) where users would answers, everyday, 3 questions related to the community category, winning points and competing against the rest of the community users.

The API is prepared to work only with logged users, using authentication tokens. Users can also reset their passwords, and they will receive emails when they register or change their password.

## Deploy

The easiest way to deploy the API is using Docker:

```
docker-compose build;
docker-compose up;
```

It includes two different containers:
- *hattrick*: where the API will be deployed with PM2
- *hattrick_db*: where the database will be hosted

By default the REST API will be available in: [http://localhost:10002/explorer](http://localhost:10002/explorer)

## Configuration

#### REST API
Edit the [start.config.json](start.config.json) to set the following env vars:

- *DB_HOST*: database host (default: "hattrick_db")
- *DB_NAME*: database name (default: "hattrick")
- *DB_PASSWORD*: database  (default: "hattrick")
- *DB_USER*: database user (default: "hattrick")
- *APP_PORT*: port where the REST API will be listening (default: 10002)
- *APP_HOST*: host/domain where the assets (images) will be located (default: "http://www.danigarcia-dev.com")
- *CRYPTO_ALG*: encryption algorithm used to encrypt user passwords (default: "aes-256-ctr")
- *CRYPTO_PWD*: encryption password for the encryption algorithm (default: "xxxxxxxxxx")
- *EMAIL_USER*: email address for nodemailer (default: "apphattrick@gmail.com")
- *EMAIL_PWD*: email password
- *EMAIL_SERVICE*: email service used for nodemailer (default: "Gmail")

**Important**: if you change the port where the REST API will be listening (*APP_PORT*), you must change it as well in the [docker-compose.yml](docker-compose.yml) file.

#### Database
For the database to be created when the *hattrick_db* container is started, we need to set up the env vars that the MySQL container will need. These var are defined in the [mysql-environment.yml](mysql-environment.yml) file:
- *MYSQL_ROOT_PASSWORD*: mysql root password
- *MYSQL_USER*: database name (default: "hattrick")
- *MYSQL_PASSWORD*: database password (default: "hattrick")
- *MYSQL_DATABASE*: database user (default: "hattrick")

When the container is started, the *hattrick* database will be created, as well a user with granted privileges. This database, user and password are the same that must be used in the REST API configuration.

## REST API Endpoints

**Note**: for those endpoints that need authentication, you must set the access token (given when login is done) in REST API explorer page in the text input you can find on the top-right corner.

#### Users
- **[<code>POST</code> users](api-doc/users/POST_user.md)**
- **[<code>POST</code> users/login](api-doc/users/POST_login.md)**
- **[<code>POST</code> users/logout](api-doc/users/POST_logout.md)**
- **[<code>POST</code> users/resetPassword](api-doc/users/POST_resetPassword.md)**
- **[<code>GET</code> users/{id}](api-doc/users/GET_user.md)**
- **[<code>PUT</code> users/{id}](api-doc/users/PUT_user.md)**

#### Reset Password Request
- **[<code>POST</code> resetPasswordRequests](api-doc/reset-password/POST_reset.md)**

#### Categories
- **[<code>POST</code> categories](api-doc/categories/POST_category.md)**
- **[<code>PUT</code> categories/{id}](api-doc/categories/PUT_category.md)**
- **[<code>GET</code> categories/{id}](api-doc/categories/GET_category.md)**
- **[<code>POST</code> categories/{id}/questions](api-doc/categories/POST_category_question.md)**
- **[<code>PUT</code> categories/{id}/questions](api-doc/categories/PUT_category_question.md)**
- **[<code>GET</code> categories/{id}/questions](api-doc/categories/GET_category_question.md)**

#### Communities, Comments, Questions, Answers

Rest of the API endpoints are very similar in its behaviour to the ones explained previously.

So, I'm not going to repeat my self. Why don't you give it a try??!! =)

## Roadmap

- Add roles for the users (PLAYER, ADMIN, etc.) and ACLs to the differente endponints depending on those roles. For example questions and categories should be only created by admins.
