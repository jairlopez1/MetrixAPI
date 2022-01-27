"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const budgetReport_entity_1 = require("./entities/budgetReport.entity");
const client_entity_1 = require("./entities/client.entity");
const timeEntry_entity_1 = require("./entities/timeEntry.entity");
const user_entity_1 = require("./entities/user.entity");
const userAssignment_entity_1 = require("./entities/userAssignment.entity");
const harvest_controller_1 = require("./harvest.controller");
const harvest_service_1 = require("./harvest.service");
let HarvestModule = class HarvestModule {
};
HarvestModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([
                project_entity_1.Project,
                budgetReport_entity_1.BudgetReport,
                client_entity_1.Client,
                timeEntry_entity_1.TimeEntry,
                user_entity_1.User,
                userAssignment_entity_1.UserAssignment,
            ]),
        ],
        controllers: [harvest_controller_1.HarvestController],
        providers: [harvest_service_1.HarvestService],
    })
], HarvestModule);
exports.HarvestModule = HarvestModule;
//# sourceMappingURL=harvest.module.js.map