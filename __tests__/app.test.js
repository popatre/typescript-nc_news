const request = require("supertest");
const db = require("../db/index.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");

describe("/api", () => {
    test("status 404 - not a route/path ", () => {
        return request(app)
            .get("/api/badroute")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe("invalid url");
            });
    });
    describe("GET/api/topics", () => {
        test("status:200 - responds with array of topics, with appropriate fields", () => {
            return request(app)
                .get("/api/topics")
                .expect(200)
                .then(({ body }) => {
                    const { topics } = body;
                    expect(topics).toBeInstanceOf(Array);
                    expect(topics).toHaveLength(3);
                    topics.forEach((topic) => {
                        expect(topic).toMatchObject({
                            slug: expect.any(String),
                            description: expect.any(String),
                        });
                    });
                });
        });
    });

    describe("GET/api/articles/:article_id", () => {
        test("status 200 - returns articles object correctly based on id ", () => {
            return request(app)
                .get("/api/articles/1")
                .expect(200)
                .then(({ body }) => {
                    const { article } = body;
                    expect(article).toBeInstanceOf(Object);
                    expect(article).toMatchObject({
                        title: "Living in the shadow of a great man",
                        author: "butter_bridge",
                        article_id: 1,
                        body: "I find this existence challenging",
                        topic: "mitch",
                        created_at: expect.any(String),
                        votes: 100,
                        comment_count: "11",
                    });
                });
        });
        test("status 400 - requests id that doesnt exist with number parameter", () => {
            return request(app)
                .get("/api/articles/2000")
                .expect(400)
                .then(({ body }) => {
                    expect(body).toEqual({ message: "invalid request" });
                });
        });
        test("status 400 - requests id that doesnt exist with string parameter/wrong data type", () => {
            return request(app)
                .get("/api/articles/doesntexist")
                .expect(400)
                .then(({ body }) => {
                    expect(body).toEqual({ message: "invalid request" });
                });
        });
    });
    describe("PATCH/api/articles/:article_id", () => {
        test("status 201 - increments votes correctly and returns updated article ", () => {
            const update = { inc_votes: 10 };
            return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(201)
                .then(({ body }) => {
                    const { article } = body;
                    expect(article).toMatchObject({
                        article_id: 1,
                        title: "Living in the shadow of a great man",
                        topic: "mitch",
                        author: "butter_bridge",
                        body: "I find this existence challenging",
                        created_at: expect.any(String),
                        votes: 110,
                    });
                });
        });
        test("status 201 - decrements votes correctly and returns updated article ", () => {
            const update = { inc_votes: -10 };
            return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(201)
                .then(({ body }) => {
                    const { article } = body;
                    expect(article).toMatchObject({
                        article_id: 1,
                        title: "Living in the shadow of a great man",
                        topic: "mitch",
                        author: "butter_bridge",
                        body: "I find this existence challenging",
                        created_at: expect.any(String),
                        votes: 90,
                    });
                });
        });
        test("status 400 - missing data from patch object  ", () => {
            const update = { inc_votes: "" };
            return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid input");
                });
        });
        test("status 400 - incorrect data type used to increment  ", () => {
            const update = { inc_votes: "string" };
            return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid request");
                });
        });
        test("status 400 - mis-spelt key on patch object  ", () => {
            const update = { incvote: 10 };
            return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid input");
                });
        });
        test("status 400 - extra key on patch object  ", () => {
            const update = { inc_vote: 10, name: "mitch" };
            return request(app)
                .patch("/api/articles/1")
                .send(update)
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid input");
                });
        });
    });
    describe("GET/api/articles", () => {
        test("status 200 - responds with array of article objects, containing correct properties ", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toBeInstanceOf(Array);
                    expect(body.articles).toHaveLength(12);
                    body.articles.forEach((article) => {
                        expect(article).toMatchObject({
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(String),
                        });
                    });
                });
        });
        test("status 200 - returns articles sorted by date when no sorted param given ", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toBeSortedBy("created_at");
                });
        });
        test("status 200 - returns articles sorted by column selected ", () => {
            return request(app)
                .get("/api/articles?sort_by=author")
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toBeSortedBy("author");
                });
        });
        test("status 400 - invalid sort query/not a column in db ", () => {
            return request(app)
                .get("/api/articles?sort_by=notacolumn")
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid sort query");
                });
        });
        test("status 200 - orders db by ascending as default ", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toBeSortedBy("created_at", {
                        ascending: true,
                    });
                });
        });
        test("status 200 - accepts order query ", () => {
            return request(app)
                .get("/api/articles?order=desc")
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toBeSortedBy("created_at", {
                        descending: true,
                    });
                });
        });
        test("status 400 - invalid order query ", () => {
            return request(app)
                .get("/api/articles?order=notanorder")
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid order query");
                });
        });
        test("status 200 - filters by topic query ", () => {
            return request(app)
                .get("/api/articles?topic=cats")
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toHaveLength(1);
                });
        });
        test("status 400 - tries to filter by topic that doesnt exist ", () => {
            return request(app)
                .get("/api/articles?topic=notatopic")
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid input");
                });
        });
    });
});
