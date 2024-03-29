"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const testData = __importStar(require("../db/data/test-data/index"));
const seed_1 = __importDefault(require("../db/seeds/seed"));
const index_1 = __importDefault(require("../db/index"));
beforeEach(() => (0, seed_1.default)(testData));
after(() => index_1.default.end());
describe("GET /articles", () => {
    it("status 200: returns all articles", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(12);
            body.articles.forEach((article) => {
                (0, chai_1.expect)(article).to.include.all.keys("title", "topic", "author", "body", "created_at", "votes", "comment_count");
            });
        });
    });
    it("status 200: returns all articles sorted by date as default", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(12);
            (0, chai_1.expect)(body.articles[0].article_id).to.eql(3);
        });
    });
    it("status 200: sorts by query in path", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(12);
            (0, chai_1.expect)(body.articles[0].article_id).to.eql(1);
        });
    });
    it("status 400: bad sort_by query value", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?sort_by=badSortBy")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Invalid query");
        });
    });
    it("status 200: orders by order query", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?order=ASC")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(12);
            (0, chai_1.expect)(body.articles[0].article_id).to.eql(7);
        });
    });
    it("status 400: invalid order query", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?order=invalid")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Invalid query");
        });
    });
    it("status 200: allows filter by topic", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?topic=cats")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(1);
        });
    });
    it("status 404: topic not found", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?topic=notATopic")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("topic not found");
        });
    });
    it("status 200: returns empty array when filter by topic with no articles", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?topic=paper")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(0);
        });
    });
    it("status 404 - general route not found", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/notfound")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Route not found");
        });
    });
});
describe("GET /api/topics", () => {
    it("status 200 - returns all topics", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.topics);
            (0, chai_1.expect)(body.topics).to.have.lengthOf(3);
            body.topics.forEach((article) => {
                (0, chai_1.expect)(article).to.include.all.keys("description", "slug");
            });
        });
    });
});
describe("GET /api/articles:id", () => {
    it("status 200: returns correct articles from id requested", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isObject(body.article);
            (0, chai_1.expect)(body.article).to.include.all.keys("title", "topic", "author", "body", "created_at", "votes", "article_id", "comment_count");
            (0, chai_1.expect)(body.article.article_id).to.eql(1);
            (0, chai_1.expect)(body.article.comment_count).to.eql(11);
        });
    });
    describe("Errors", () => {
        it("status 404 - article not found", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/articles/999999")
                .expect(404)
                .then(({ body }) => {
                (0, chai_1.expect)(body.msg).to.eql("Article not found");
            });
        });
        it("status 400 - bad article id type", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/articles/badtype")
                .expect(400)
                .then(({ body }) => {
                (0, chai_1.expect)(body.msg).to.eql("Bad request");
            });
        });
    });
});
describe("GET /api/users", () => {
    it("status 200 -  returns all users", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/users")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.users);
            (0, chai_1.expect)(body.users).to.have.lengthOf(4);
            body.users.forEach((article) => {
                (0, chai_1.expect)(article).to.include.all.keys("username", "name", "avatar_url");
            });
        });
    });
});
describe("GET /api/users/:username", () => {
    it("status 200 -  returns all users", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/users/rogersop")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isObject(body.user);
            (0, chai_1.expect)(body.user).to.include.all.keys("username", "name", "avatar_url");
            (0, chai_1.expect)(body.user.username).to.eql("rogersop");
        });
    });
    it("status 404 - username not found", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/users/notausername")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Username not found");
        });
    });
    it("status 404 - username not found - username beginning with number", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/users/99allstars")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Username not found");
        });
    });
});
describe("PATCH /api/articles/:article_id", () => {
    it("status 200: increments article requested votes, responds with patched object", () => {
        const patchObj = { inc_votes: 10 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/1")
            .send(patchObj)
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isObject(body.article);
            (0, chai_1.expect)(body.article).to.include.all.keys("title", "topic", "author", "body", "created_at", "votes", "article_id");
            (0, chai_1.expect)(body.article.article_id).to.eql(1);
            (0, chai_1.expect)(body.article.votes).to.eql(110);
        });
    });
    it("status 200: decrements article requested votes, responds with patched object", () => {
        const patchObj = { inc_votes: -10 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/1")
            .send(patchObj)
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isObject(body.article);
            (0, chai_1.expect)(body.article).to.include.all.keys("title", "topic", "author", "body", "created_at", "votes", "article_id");
            (0, chai_1.expect)(body.article.article_id).to.eql(1);
            (0, chai_1.expect)(body.article.votes).to.eql(90);
        });
    });
    it("status 404: patch to not found article id", () => {
        const patchObj = { inc_votes: 10 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/999999")
            .send(patchObj)
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Article not found");
        });
    });
    it("status 400: patch to bad article id", () => {
        const patchObj = { inc_votes: 10 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/badId")
            .send(patchObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
    it("status 400: patch object missing keys", () => {
        const patchObj = { inc_vot: 10 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/1")
            .send(patchObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Missing object keys");
        });
    });
    it("status 400: patch object wrong data type", () => {
        const patchObj = { inc_votes: "wrong data" };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/articles/1")
            .send(patchObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
});
describe("DELETE /api/comments/:comment_id", () => {
    it("status 204: deleted comments from id", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/comments/1").expect(204);
    });
    it("status 404: id not found to delete", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/comments/9999999")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Id not found");
        });
    });
    it("status 400: bad id to delete", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/comments/notAnId")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
});
describe("POST /api/articles/:article_id/comments", () => {
    it("status 201: posts comment to article, returning new post", () => {
        const postObj = { username: "rogersop", body: "Test body" };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/1/comments")
            .send(postObj)
            .expect(201)
            .then(({ body }) => {
            (0, chai_1.expect)(body.comment).to.include.all.keys("body", "votes", "author", "article_id", "created_at", "comment_id");
            (0, chai_1.expect)(body.comment.article_id).to.eql(1);
        });
    });
    it("status 404: article id not found", () => {
        const postObj = { username: "rogersop", body: "Test body" };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/9999999/comments")
            .send(postObj)
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Article not found");
        });
    });
    it("status 400: bad article id", () => {
        const postObj = { username: "rogersop", body: "Test body" };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/badarticleid/comments")
            .send(postObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
    it("status 400: missing post body keys", () => {
        const postObj = { body: "Test body" };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/badarticleid/comments")
            .send(postObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Missing post body keys");
        });
    });
    it("status 400: wrong data type on post body", () => {
        const postObj = { username: 999999, body: 99999 };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles/badarticleid/comments")
            .send(postObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Post values must be strings");
        });
    });
});
describe("GET  /api/articles/:article_id/comments", () => {
    it("status 200: returns an array of comment for requested article id", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.comments);
            (0, chai_1.expect)(body.comments).to.have.length(11);
            (0, chai_1.expect)(body.comments[0].article_id).to.eql(1);
            body.comments.forEach((comment) => {
                (0, chai_1.expect)(comment).to.include.all.keys("body", "votes", "author", "article_id", "created_at", "comment_id");
            });
        });
    });
    it("status 404: article id not found for valid Id", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/99999/comments")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Article not found");
        });
    });
    it("status 400: article id not found", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/badIdHere/comments")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
    it("status 200: returns empty array when article id has no comments", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({ body }) => {
            (0, chai_1.expect)(body.comments).to.deep.equal([]);
        });
    });
});
describe("DELETE /api/articles/:article_id", () => {
    it("status 204: deleted article by id requested", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/articles/1")
            .expect(204)
            .then(() => {
            return (0, supertest_1.default)(app_1.default).get("/api/articles").expect(200);
        })
            .then(({ body }) => {
            (0, chai_1.expect)(body.articles).to.have.lengthOf(11);
        });
    });
    it("status 404: delete article with no existent id", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/articles/9999999")
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Article id not found");
        });
    });
    it("status 400: delete article with no existent id", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/articles/notANumber")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
});
describe("POST /api/articles", () => {
    it("status 201: posts new article to correct topic", () => {
        const postObj = {
            author: "rogersop",
            title: "New post",
            body: "New post body",
            topic: "cats",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles")
            .send(postObj)
            .expect(201)
            .then(({ body }) => {
            (0, chai_1.expect)(body.article).to.include.all.keys("author", "title", "body", "topic", "article_id", "votes", "created_at", "comment_count");
            (0, chai_1.expect)(body.article.author).to.eql("rogersop");
            (0, chai_1.expect)(body.article.title).to.eql("New post");
            (0, chai_1.expect)(body.article.body).to.eql("New post body");
            (0, chai_1.expect)(body.article.topic).to.eql("cats");
        });
    });
    it("status 404 - username not found", () => {
        const postObj = {
            author: "notAUsername",
            title: "New post",
            body: "New post body",
            topic: "cats",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles")
            .send(postObj)
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Username not found");
        });
    });
    it("status 404 - topic not found", () => {
        const postObj = {
            author: "rogersop",
            title: "New post",
            body: "New post body",
            topic: "notATopic",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles")
            .send(postObj)
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Topic not found");
        });
    });
    it("status 400 - wrong data type on a key", () => {
        const postObj = {
            author: "rogersop",
            title: 999,
            body: "New post body",
            topic: "cats",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles")
            .send(postObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
    it("status 400 - missing keys on post body", () => {
        const postObj = {};
        return (0, supertest_1.default)(app_1.default)
            .post("/api/articles")
            .send(postObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
});
describe(" POST /api/topics", () => {
    it("status 200 - adds new topics - responds with new topic", () => {
        const topicObj = {
            slug: "New topic",
            description: "Its a new topic",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/topics")
            .send(topicObj)
            .expect(201)
            .then(({ body }) => {
            (0, chai_1.expect)(body.topic).to.deep.equal(topicObj);
            return (0, supertest_1.default)(app_1.default).get("/api/topics").expect(200);
        })
            .then(({ body }) => {
            (0, chai_1.expect)(body.topics).to.have.lengthOf(4);
        });
    });
    it("status 400 - wrong data type on object", () => {
        const topicObj = {
            slug: 99999,
            description: "Its a new topic",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/topics")
            .send(topicObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
    it("status 400 - missing keys on post object", () => {
        const topicObj = {};
        return (0, supertest_1.default)(app_1.default)
            .post("/api/topics")
            .send(topicObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
});
describe("PATCH /api/comments/:comment_id", () => {
    it("status 200 - updates comment votes for selected comment id", () => {
        const commentObj = { inc_votes: 1 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/comments/1")
            .send(commentObj)
            .expect(200)
            .then(({ body }) => {
            (0, chai_1.expect)(body.comment).to.include.all.keys("body", "votes", "author", "article_id", "created_at", "comment_id");
            (0, chai_1.expect)(body.comment.comment_id).to.eql(1);
        });
    });
    it("status 404 - comment id not found", () => {
        const commentObj = { inc_votes: 1 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/comments/999999")
            .send(commentObj)
            .expect(404)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Comment not found");
        });
    });
    it("status 400 - bad data type in id", () => {
        const commentObj = { inc_votes: 1 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/comments/badCommentId")
            .send(commentObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad request");
        });
    });
    it("status 400 - bad data type in object body", () => {
        const commentObj = { inc_votes: "badData" };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/comments/badCommentId")
            .send(commentObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad data type and/or missing keys");
        });
    });
    it("status 400 - missing keys in patch body", () => {
        const commentObj = { inc: 1 };
        return (0, supertest_1.default)(app_1.default)
            .patch("/api/comments/badCommentId")
            .send(commentObj)
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Bad data type and/or missing keys");
        });
    });
});
describe("GET /api/articles pagination", () => {
    it("returns correct number of articles based on limit passed", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?limit=5")
            .expect(200)
            .then(({ body }) => {
            (0, chai_1.expect)(body.articles).to.have.lengthOf(5);
        });
    });
    it("returns queries from page requested", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?limit=5&p=3")
            .expect(200)
            .then(({ body }) => {
            console.log(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(2);
            (0, chai_1.expect)(body.articles[0].article_id).to.eql(11);
        });
    });
    it("status 200 - returns empty array when passed query beyond amount of records", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?limit=5&p=99")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.articles);
            (0, chai_1.expect)(body.articles).to.have.lengthOf(0);
        });
    });
    it("status 400 - non-number type passed as limit query", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?limit=notANumber&p=2")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Limit and/or p must be a number");
        });
    });
    it("status 400 - non-number type passed as p query", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles?limit=5&p=notANumber")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Limit and/or p must be a number");
        });
    });
});
describe("GET /api/articles/:article_id/comments pagination", () => {
    it("returns correct number of articles based on limit passed", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments?limit=5")
            .expect(200)
            .then(({ body }) => {
            (0, chai_1.expect)(body.comments).to.have.lengthOf(5);
        });
    });
    it("returns queries from page requested", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments?limit=5&p=3")
            .expect(200)
            .then(({ body }) => {
            (0, chai_1.expect)(body.comments).to.have.lengthOf(1);
        });
    });
    it("status 200 - returns empty array when passed query beyond amount of records", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments?limit=5&p=99")
            .expect(200)
            .then(({ body }) => {
            chai_1.assert.isArray(body.comments);
            (0, chai_1.expect)(body.comments).to.have.lengthOf(0);
        });
    });
    it("status 400 - non-number type passed as limit query", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments?limit=notANumber&p=2")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Limit and/or p must be a number");
        });
    });
    it("status 400 - non-number type passed as p query", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/articles/1/comments?limit=5&p=notANumber")
            .expect(400)
            .then(({ body }) => {
            (0, chai_1.expect)(body.msg).to.eql("Limit and/or p must be a number");
        });
    });
});
