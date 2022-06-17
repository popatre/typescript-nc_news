# <h1> NC NEWS API - Back End </h1>

This is a RESTful API which provides data from the northcoders news database. The database is PSQL, interacted with via node-postgres.
It contains data on users, articles, topics and comments, which are accessible via the endpoints provided and appropriate GET, POST, PATCH and DELETE methods.

<br>

**Hosted version**

The hosted version of the API can be found here: <https://jmg-nc-news.herokuapp.com/api>
<br>

A link the the github repository can be found here: <https://github.com/popatre/nc_news>

<br>

## Prerequisites

Please ensure the following are installed:

-   Node: v14.16.0
-   Postgres: v13.0
-   node package manager: v7.24.0

## Getting Started

To set up your own repository, please follow the instructions below

1.  Copy the code and paste into your terminal, in the usual directory for your projects

        git clone https://github.com/popatre/nc_news.git

2.  Once it has been successfully cloned, type the following code and press enter, in order to access the directory.

        cd nc_news

3.  From here, you can open the directory in your source-code editor of choice e.g. visual-studio, atom etc.

<br>

4.  Once in your editor, the dependencies to run the project can be installed using npm package manager.

    In your terminal, type the code below to install the packages need to run the project

        npm install

<br>

**The following dependencies should have been installed:**

-   dotenv
-   express
-   pg
-   pg-format
-   cors

**Developer dependencies:**

-   @types/chai
-   @types/express
-   @types/mocha
-   @types/node
-   @types/pg-format
-   @types/supertest
-   chai v.4.3.6
-   supertest v.6.1.6
-   ts-mocha v.10.0.0
-   ts-node v.10.8.1
-   typescript

<br>

5. Created two .env files in order to link to the development and test databases
   These files should be called:

-   `.env.dev`
-   `.env.test`

6.  Inside each file add: ` PGDATABASE=nc_news` and ` PGDATABASE=nc_news_test` depending on the file.

7.  Create the databases by running the following command in your terminal:

        npm run setup-dbs

_The console should confirm the two databases have been created._

_If an error occurs, please ensure your have named/set up the .env files as stated, and that they are in the root level of your directory_

<br>

8.  The development database can then be seeded by running the following command in the terminal:

         npm run seed

    _The console should confirm that four tables have been inserted into. If an error occurs, please ensure you have created the databases prior to seeding_

 <br>

9.  To run the server locally, type the code below into your terminal. The terminal should confirm that it has started listening

        npm start

<br>

10. Method requests (GET, PATCH, POST, DELETE) can now be performed at `http://localhost:9090` using your API endpoint testing tool of choice i.e. postman, insomnia etc

_The available routes and methods can be found below_

# Routes

**The server has the following 14 endpoints:**

-   GET /api/topics which serves a list of topics

-   POST /api/topics adds a new topic to the database

-   GET /api/articles/:article_id, which responds with the article corresponding to the article_id passed in

-   POST /api/articles adds a new article to the topic in the post object

-   PATCH /api/articles/:article_id modifies the votes on the article in question

-   DELETE /api/articles/:article_id deletes the article selected by its id

-   POST /api/articles/:article_id/comments adds a new comment to the requested article

-   GET /api/articles/:article_id/comments gets all the comments belonging to the requested article

-   GET /api/articles gets all the articles in the database

-   GET /api/comments responds with all the comments in the database

-   GET /api/users responds with all the usernames in the database

-   GET /api/users:username responds the details of the username requested

-   DELETE /api/comments/:comment_id deletes the requested comment

-   GET /api serves a json object of the path above, with example responses

# Testing

The tests created can be found in the: `__tests__/app.test.js` directory

To run the testing suite, type the code below in your terminal

        npm run test

Please ensure you have the testing dependencies listed above installed, in order to ensure the tests complete successfully.

This should seed the tests database, with the test data, before each test.

The terminal should confirm that this is happening
