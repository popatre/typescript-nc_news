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
            .get("/articles")
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
                        "votes"
                    );
                    expect(body.articles[0]).to.include({
                        article_id: 1,
                        title: "Living in the shadow of a great man",
                        body: "I find this existence challenging",
                        votes: 100,
                        topic: "mitch",
                        author: "butter_bridge",
                        created_at: "2020-07-09 21:11:00.000+00",
                    });
                });
            });
    });
});
