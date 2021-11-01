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
                .get("/get/badroute")
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe("invalid url");
                });
        });
    });
});
