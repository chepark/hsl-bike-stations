"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const typeorm_1 = require("typeorm");
const Journey_1 = require("./Journey");
const Station_1 = require("./Station");
let Route = class Route {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Route.prototype, "journey_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Station_1.Station, (station) => station.startingRoutes, {
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "starting_station" }),
    __metadata("design:type", Station_1.Station)
], Route.prototype, "startingStation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Station_1.Station, (station) => station.endingRoutes, {
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "ending_station" }),
    __metadata("design:type", Station_1.Station)
], Route.prototype, "endingStation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Journey_1.Journey, (journey) => journey.route),
    __metadata("design:type", Journey_1.Journey)
], Route.prototype, "journey", void 0);
Route = __decorate([
    (0, typeorm_1.Entity)()
], Route);
exports.Route = Route;
