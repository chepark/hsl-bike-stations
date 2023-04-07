"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_js_1 = require("./db/data-source.js");
const Journey_js_1 = require("./db/entity/Journey.js");
const port = 8000;
const app = (0, express_1.default)();
data_source_js_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connection established");
})
    .catch((err) => {
    console.error("Error during DataSourceInitialization", err);
});
app.get("/", (req, res) => {
    res.send("Hello World");
    const t = data_source_js_1.AppDataSource.getRepository(Journey_js_1.Journey);
    t.find().then((stations) => {
        console.log("---------------------------");
        console.log(stations);
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
