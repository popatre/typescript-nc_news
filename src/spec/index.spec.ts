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

describe("/api/articles:id", () => {
    it("status 200: returns correct articles from id requested", () => {
        return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
                assert.isObject(body.article);
                expect(body.article).to.include.all.keys(
                    "title",
                    "topic",
                    "author",
                    "body",
                    "created_at",
                    "votes",
                    "article_id",
                    "comment_count"
                );
                expect(body.article.article_id).to.eql(1);
                expect(body.article.comment_count).to.eql(11);
            });
    });
    describe("Errors", () => {
        it("status 404 - article not found", () => {
            return request(app)
                .get("/api/articles/999999")
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).to.eql("Article not found");
                });
        });
        it("status 400 - bad article id type", () => {
            return request(app)
                .get("/api/articles/badtype")
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).to.eql("Bad request");
                });
        });
    });
});

describe("/api/users", () => {
    it("status 200 -  returns all users", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then(({ body }) => {
                assert.isArray(body.users);
                expect(body.users).to.have.lengthOf(4);
                body.users.forEach((article: {}) => {
                    expect(article).to.include.all.keys(
                        "username",
                        "name",
                        "avatar_url"
                    );
                });
            });
    });
});
describe("/api/users/:username", () => {
    it("status 200 -  returns all users", () => {
        return request(app)
            .get("/api/users/rogersop")
            .expect(200)
            .then(({ body }) => {
                assert.isObject(body.user);
                expect(body.user).to.include.all.keys(
                    "username",
                    "name",
                    "avatar_url"
                );
                expect(body.user.username).to.eql("rogersop");
            });
    });
    it("status 404 - username not found", () => {
        return request(app)
            .get("/api/users/notausername")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).to.eql("Username not found");
            });
    });
});
