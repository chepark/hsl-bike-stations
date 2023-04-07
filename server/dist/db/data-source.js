"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Station_js_1 = require("./entity/Station.js");
const Route_js_1 = require("./entity/Route.js");
const Journey_js_1 = require("./entity/Journey.js");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1111",
    database: "city-bike",
    entities: [Station_js_1.Station, Route_js_1.Route, Journey_js_1.Journey],
});
