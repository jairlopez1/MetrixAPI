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
exports.JiraService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_entity_1 = require("./entities/board.entity");
const sprint_entity_1 = require("./entities/sprint.entity");
const issue_entity_1 = require("./entities/issue.entity");
let JiraService = class JiraService {
    constructor(http) {
        this.http = http;
    }
    async syncProjects() {
        let boards;
        let startAt = 300;
        const result = [];
        const connection = typeorm_1.getConnection();
        const headersRequest = {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
            'Content-Type': 'application/json',
        };
        do {
            boards = await this.http
                .get(`${process.env.JIRA_URL}board?startAt=${startAt}`, {
                headers: headersRequest,
            })
                .toPromise();
            for (const board of boards.data.values) {
                if (board.type === 'scrum') {
                    const boardToSave = new board_entity_1.Board();
                    boardToSave.board = board.id;
                    boardToSave.label = board.name;
                    const savedBoard = await connection.manager.save(boardToSave);
                    result.push(board);
                    board.sprints = await this.getSprints(board.id, savedBoard);
                }
            }
            startAt += boards.data.values.length;
        } while (!boards.data.isLast);
        return 'Sync finished successfully!';
    }
    async getSprints(boardId, savedBoard) {
        let sprints;
        let startAt = 0;
        const result = [];
        const connection = typeorm_1.getConnection();
        const headersRequest = {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
            'Content-Type': 'application/json',
        };
        do {
            sprints = await this.http
                .get(`${process.env.JIRA_URL}board/${boardId}/sprint?startAt=${startAt}`, {
                headers: headersRequest,
            })
                .toPromise();
            for (const sprint of sprints.data.values) {
                const sprintToSave = new sprint_entity_1.Sprint();
                sprintToSave.label = sprint.name;
                sprintToSave.sprint = sprint.id;
                sprintToSave.board = savedBoard.board;
                sprintToSave.board_id = savedBoard;
                const savedSprint = await connection.manager.save(sprintToSave);
                sprint.issues = await this.getIssues(boardId, sprint.id, savedSprint);
            }
            startAt += sprints.data.values.length;
            result.push(sprints.data.values);
        } while (!sprints.data.isLast);
        return [].concat(...result);
    }
    async getIssues(boardId, sprintId, savedSprint) {
        const maxResults = 1000;
        const connection = typeorm_1.getConnection();
        const headersRequest = {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
            'Content-Type': 'application/json',
        };
        const issues = await this.http
            .get(`${process.env.JIRA_URL}board/${boardId}/sprint/${sprintId}/issue?maxResults=${maxResults}`, {
            headers: headersRequest,
        })
            .toPromise();
        for (const issue of issues.data.issues) {
            const issueToSave = new issue_entity_1.Issue();
            issueToSave.label = issue.key;
            issueToSave.type = issue.fields.issuetype.name;
            issueToSave.status = issue.fields.status.name;
            issueToSave.sprint = savedSprint.sprint;
            issueToSave.sprint_id = savedSprint;
            await connection.manager.save(issueToSave);
        }
        return issues.data.issues;
    }
    async getAllProjects() {
        const headersRequest = {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
            'Content-Type': 'application/json',
        };
        const projects = await this.http
            .get(`${process.env.JIRA_URL}board`, {
            headers: headersRequest,
        })
            .toPromise();
        return projects.data;
    }
    async getSprintsByProjectId(id) {
        const headersRequest = {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
            'Content-Type': 'application/json',
        };
        const sprints = await this.http
            .get(`${process.env.JIRA_URL}board/${id}/sprint`, {
            headers: headersRequest,
        })
            .toPromise();
        return sprints.data;
    }
    async getIssuesBySprintId(id) {
        const headersRequest = {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
            'Content-Type': 'application/json',
        };
        const issues = await this.http
            .get(`${process.env.JIRA_URL}sprint/${id}/issue`, {
            headers: headersRequest,
        })
            .toPromise();
        return issues.data;
    }
};
JiraService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], JiraService);
exports.JiraService = JiraService;
//# sourceMappingURL=jira.service.js.map