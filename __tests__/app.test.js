const request = require("supertest");
const db = require("../db/index.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");

describe("/api", () => {
    describe("/api/topics", () => {
        describe("/GET", () => {
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
        test("status 404 - not a route/path ", () => {
            return request(app)
                .get("/api/badroute")
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid url");
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
            test("status 406 - missing data from patch object  ", () => {
                const update = { inc_votes: "" };
                return request(app)
                    .patch("/api/articles/1")
                    .send(update)
                    .expect(406)
                    .then(({ body }) => {
                        expect(body.message).toBe("missing input");
                    });
            });
            test("status 406 - incorrect data type used to increment  ", () => {
                const update = { inc_votes: "string" };
                return db
                    .request(app)
                    .patch("/api/articles/1")
                    .send(update)
                    .expect(406)
                    .then(({ body }) => {
                        expect(body.message).toBe("invalid input");
                    });
            });
            test("status 406 - mis-spelt key on patch object  ", () => {
                const update = { incvote: 10 };
                return db
                    .request(app)
                    .patch("/api/articles/1")
                    .send(update)
                    .expect(406)
                    .then(({ body }) => {
                        expect(body.message).toBe("invalid input");
                    });
            });
        });
    });
});
