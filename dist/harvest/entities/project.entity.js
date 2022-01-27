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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const budgetReport_entity_1 = require("./budgetReport.entity");
const timeEntry_entity_1 = require("./timeEntry.entity");
const userAssignment_entity_1 = require("./userAssignment.entity");
let Project = class Project {
};
__decorate([
    typeorm_1.Column(),
    typeorm_1.Generated('increment'),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Project.prototype, "harvest_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Project.prototype, "is_active", void 0);
__decorate([
    typeorm_1.OneToOne(() => budgetReport_entity_1.BudgetReport, (budgetReport) => budgetReport.project),
    __metadata("design:type", budgetReport_entity_1.BudgetReport)
], Project.prototype, "budgetReport", void 0);
__decorate([
    typeorm_1.OneToMany(() => userAssignment_entity_1.UserAssignment, (userAssignments) => userAssignments.project),
    __metadata("design:type", Array)
], Project.prototype, "userAssignments", void 0);
__decorate([
    typeorm_1.OneToMany(() => timeEntry_entity_1.TimeEntry, (timeEntries) => timeEntries.project),
    __metadata("design:type", Array)
], Project.prototype, "timeEntries", void 0);
Project = __decorate([
    typeorm_1.Entity()
], Project);
exports.Project = Project;
//# sourceMappingURL=project.entity.js.map