# <h1> NC NEWS API - Back End </h1>

This is a RESTful API which provides data from the northcoders news database. The database is PSQL, interacted with via node-postgres.
It contains data on users, articles, topics and comments, which are accessible via the endpoints provided and appropriate GET, POST, PATCH and DELETE methods.

<br>

<h3> <strong>Hosted version</strong> </h3>

The hosted version of the API can be found here: <https://jmg-nc-news.herokuapp.com/api>
<br>

A link the the github repository can be found here: <https://github.com/popatre/nc_news>

<br>

# Prerequisites

<h3>Please ensure the following are installed: </h3>

<ul>
<li>Node: v14.16.0   </li>
<li>Postgres: v13.0  </li>
<li>node package manager: v7.24.0 </li>

</ul>

# Getting Started

<p> To set up your own repository, please follow the instructions below </p>

<ol> 
<li> 
Copy the code and paste into your terminal, in the usual directory for your projects
<code> git clone https://github.com/popatre/nc_news.git </code></li>
<br>
<li>
Once it has been successfully cloned, type <code>cd nc_news</code> and press enter,  in order to access the directory.

</li>
<br>
<li>
From here, you can open the directory in your source-code editor of choice e.g. visual-studio code, atom etc.

</li>
<br>
<li>
Once in your editor, the dependencies to run the project can be installed using npm package manager.<br> In your terminal, type <code>npm install</code> to install the packages need to run the project

</li>
<br>

<li>
The following dependencies should have been installed:
<ul>
<li> dotenv</li>
<li> express</li>
<li> pg</li>
<li> pg-format</li>
 <i>Developer dependencies for testing:  </i>
 <ul> 
 <li> jest</li>
 <li> supertest</li>
 <li> jest-sorted</li>
 </ul>
</ul>
</li>
<br>
<li> <p>Created two .env files in order to link to the development and test databases</p>
<p> These files should be called:</p>
<ul>
<li><code> .env.dev</code></li>
<li><code> .env.test</code></li>
<br>
<p> Inside each file add: <code> PGDATABASE=nc_news</code> and <code> PGDATABASE=nc_news_test</code> depending on the file</p>
</ul>

</li>

<br>
<li>
<p> Create the databases by running the following command in your terminal: <code> npm run setup-dbs</code></p>
<i> The console should confirm the two databases have been created. If an error occurs, please ensure your have named/set up the .env files as stated, and that they are in the root level of your directory</i>
</li>
<br>
<li>
<p>The development database can then be seeded by running the following command in the terminal: <code> npm run seed</code> </p>
<i> The console should confirm that four tables have been inserted into. If an error occurs, please ensure you have created the databases prior to seeding</i>
</li>
<br>

<li> To run the server locally, type <code>npm start</code> in your terminal. The terminal should confirm that it has started listening</li>
<br>
<li> Method requests (GET, PATCH, POST, DELETE) can now be performed at <code> http://localhost:9090 </code> using your API endpoint testing tool of choice i.e. postman, insomnia etc </li><br>
<i> The available routes and methods can be found below </i>

<ol>

<br>
<br>

# Routes

The server has the following endpoints,

GET /api/topics, which serves a list of topics

GET /api/articles/:article_id, which responds with the article corresponding to the article_id passed in

POST /api/articles adds a new article to the topic in the post object

PATCH /api/articles/:article_id modifies the votes on the article in question

DELETE /api/articles/:article_id deletes the article selected by its id

POST /api/articles/:article_id/comments adds a new comment to the requested article

GET /api/articles/:article_id/comments gets all the comments belonging to the requested article

GET /api/articles gets all the articles in the database

GET /api/comments responds with all the comments in the database

GET /api/users responds with all the usernames in the database

GET /api/users:username responds the details of the username requested

DELETE /api/comments/:comment_id deletes the requested comment

GET /api serves a json object of the path above, with example responses

<br>

# Testing

<p> The tests created can be found in the: <code> __tests__/app.test.js</code> directory</p>

<p> To run the testing suite, type  <code> npm run test </code> in your terminal</p>

<i> Please ensure you have the testing dependencies listed above installed, in order to ensure the tests complete successfully.</i>

<p> This should seed the tests database, with the test data, before each test. The terminal should confirm that this is happening</p>
