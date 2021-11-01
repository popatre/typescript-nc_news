const request = require("supertest");
const db = require("../db/index.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");

describe("/api", () => {
    describe("/GET", () => {
        describe("/api/topics", () => {
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
        describe("/api/articles/:article_id", () => {
            test.only("status 400 - returns articles object correctly based on id ", () => {
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
        });
    });
});
