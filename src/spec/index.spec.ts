process.env.NODE_ENV = "test";
import { expect, assert } from "chai";
import request from "supertest";
import app from "../app";
import * as testData from "../db/data/test-data/index";
import seed from "../db/seeds/seed";
import db from "../db/index";

beforeEach(() => seed(testData));
after(() => db.end());

describe("/articles", () => {
    it("status 200: returns all articles", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                assert.isArray(body.articles);
                expect(body.articles).to.have.lengthOf(12);
                body.articles.forEach((article: {}) => {
                    expect(article).to.include.all.keys(
                        "title",
                        "topic",
                        "author",
                        "body",
                        "created_at",
                        "votes",
                        "comment_count"
                    );
                });
            });
    });
    it("status 404 - general route not found", () => {
        return request(app)
            .get("/api/notfound")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).to.eql("Route not found");
            });
    });
});

describe("/api/topics", () => {
    it("status 200 - returns all topics", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
                assert.isArray(body.topics);
                expect(body.topics).to.have.lengthOf(3);
                body.topics.forEach((article: {}) => {
                    expect(article).to.include.all.keys("description", "slug");
                });
            });
    });
});
