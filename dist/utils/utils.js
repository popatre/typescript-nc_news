"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfExists = exports.getValidTopics = exports.checkIsValidQuery = void 0;
const index_1 = __importDefault(require("../db/index"));
const checkIsValidQuery = (greenList, wordToCheck) => {
    if (!greenList.includes(wordToCheck)) {
        return Promise.reject({ status: 400, msg: "Invalid query" });
    }
    else {
        return true;
    }
};
exports.checkIsValidQuery = checkIsValidQuery;
const getValidTopics = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield index_1.default.query(`SELECT slug from topics;`);
    const topics = rows.map((topic) => topic.slug);
    return topics;
});
exports.getValidTopics = getValidTopics;
const checkIfExists = (table, column, value, message) => {
    return index_1.default
        .query(`SELECT * from ${table} WHERE ${column} = $1`, [value])
        .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: `${message}`,
            });
        }
        else
            return [];
    });
};
exports.checkIfExists = checkIfExists;
