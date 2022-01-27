"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraModule = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./entities/board.entity");
const sprint_entity_1 = require("./entities/sprint.entity");
const issue_entity_1 = require("./entities/issue.entity");
const jira_controller_1 = require("./jira.controller");
const jira_service_1 = require("./jira.service");
let JiraModule = class JiraModule {
};
JiraModule = __decorate([
    common_2.Module({
        imports: [common_1.HttpModule, typeorm_1.TypeOrmModule.forFeature([board_entity_1.Board, sprint_entity_1.Sprint, issue_entity_1.Issue])],
        controllers: [jira_controller_1.JiraController],
        providers: [jira_service_1.JiraService],
    })
], JiraModule);
exports.JiraModule = JiraModule;
//# sourceMappingURL=jira.module.js.map