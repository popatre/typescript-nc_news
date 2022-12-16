"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errors_controller_1 = require("./controllers/errors.controller");
const api_router_1 = __importDefault(require("./routers/api.router"));
const app = (0, express_1.default)();
const cors = require("cors");
const path_1 = __importDefault(require("path"));
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/api", api_router_1.default);
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.all("*", errors_controller_1.notValidRoute);
app.use(errors_controller_1.errors400);
app.use(errors_controller_1.psqlErrors);
exports.default = app;
