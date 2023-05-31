"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_js_1 = require("./db/data-source.js");
const journeyRoutes_js_1 = require("./routes/journeyRoutes.js");
const stationRoutes_js_1 = require("./routes/stationRoutes.js");
const port = 8000;
const app = (0, express_1.default)();
// connect to database
data_source_js_1.AppDataSource.initialize()
    .then(() => {
    console.log("DB connected");
})
    .catch((err) => {
    console.error("Error in DB connection: ", err);
});
// middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// ! remove later
// ! study about 304 error code and change to other solution.
app.disable("etag");
app.use(journeyRoutes_js_1.journeyRoutes);
app.use(stationRoutes_js_1.stationRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
