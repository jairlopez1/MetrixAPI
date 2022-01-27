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
exports.TimeEntry = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const user_entity_1 = require("./user.entity");
const userAssignment_entity_1 = require("./userAssignment.entity");
let TimeEntry = class TimeEntry {
};
__decorate([
    typeorm_1.Column(),
    typeorm_1.Generated('increment'),
    __metadata("design:type", Number)
], TimeEntry.prototype, "id", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], TimeEntry.prototype, "harvest_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], TimeEntry.prototype, "spend_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], TimeEntry.prototype, "hours", void 0);
__decorate([
    typeorm_1.Column('json', { nullable: true }),
    __metadata("design:type", Number)
], TimeEntry.prototype, "billable_rate", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: true }),
    __metadata("design:type", Number)
], TimeEntry.prototype, "cost_rate", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.timeEntries),
    __metadata("design:type", user_entity_1.User)
], TimeEntry.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => userAssignment_entity_1.UserAssignment, (userAssignment) => userAssignment.timeEntries),
    __metadata("design:type", userAssignment_entity_1.UserAssignment)
], TimeEntry.prototype, "user_assignment", void 0);
__decorate([
    typeorm_1.ManyToOne(() => project_entity_1.Project, (project) => project.timeEntries),
    __metadata("design:type", project_entity_1.Project)
], TimeEntry.prototype, "project", void 0);
TimeEntry = __decorate([
    typeorm_1.Entity()
], TimeEntry);
exports.TimeEntry = TimeEntry;
//# sourceMappingURL=timeEntry.entity.js.map