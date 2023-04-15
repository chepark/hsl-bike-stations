"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
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
app.use(journeyRoutes_js_1.journeyRoutes);
app.use(stationRoutes_js_1.stationRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
