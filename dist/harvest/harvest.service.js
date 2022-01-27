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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_dto_1 = require("./dtos/project.dto");
const project_entity_1 = require("./entities/project.entity");
const budgetReport_entity_1 = require("./entities/budgetReport.entity");
const client_dto_1 = require("./dtos/client.dto");
const client_entity_1 = require("./entities/client.entity");
const timeEntry_entity_1 = require("./entities/timeEntry.entity");
const user_dto_1 = require("./dtos/user.dto");
const user_entity_1 = require("./entities/user.entity");
const userAssignment_entity_1 = require("./entities/userAssignment.entity");
const harvestToken = process.env.HARVEST_TOKEN;
const harvestAccountId = process.env.HARVEST_ACCOUNT_ID;
const harvestUrl = process.env.HARVEST_URL;
let HarvestService = class HarvestService {
    constructor(projectRepository, budgetReportRepository, clientRepository, timeEntryRepository, userRepository, userAssignmentRepository, http) {
        this.projectRepository = projectRepository;
        this.budgetReportRepository = budgetReportRepository;
        this.clientRepository = clientRepository;
        this.timeEntryRepository = timeEntryRepository;
        this.userRepository = userRepository;
        this.userAssignmentRepository = userAssignmentRepository;
        this.http = http;
        this.headersRequest = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${harvestToken}`,
            'Harvest-Account-Id': `${harvestAccountId}`,
        };
    }
    async getProjects() {
        const projects = await this.http
            .get(`${harvestUrl}projects`, {
            headers: this.headersRequest,
        })
            .toPromise();
        return projects.data.projects;
    }
    async saveProjects() {
        try {
            const projects = await this.getProjects();
            for (const project of projects) {
                const alreadyExists = await this.projectRepository.findOne({
                    where: {
                        harvest_id: project.id,
                    },
                });
                if (alreadyExists) {
                    continue;
                }
                const newProject = new project_dto_1.ProjectDto();
                newProject.harvest_id = project.id;
                newProject.name = project.name;
                newProject.is_active = project.is_active;
                this.projectRepository.insert(newProject);
            }
        }
        catch (error) {
            return new Error('Sync has failed');
        }
    }
    async getUsers() {
        const users = await this.http
            .get(`${harvestUrl}users`, {
            headers: this.headersRequest,
        })
            .toPromise();
        return users.data.users;
    }
    async saveUsers() {
        try {
            const users = await this.getUsers();
            for (const user of users) {
                const alreadyExists = await this.userRepository.findOne({
                    where: {
                        harvest_id: user.id,
                    },
                });
                if (alreadyExists) {
                    continue;
                }
                const newUser = new user_dto_1.UserDto();
                newUser.harvest_id = user.id;
                newUser.first_name = user.first_name;
                newUser.last_name = user.last_name;
                newUser.is_active = user.is_active;
                newUser.cost_rate = user.cost_rate;
                newUser.roles = user.roles;
                this.userRepository.insert(newUser);
            }
        }
        catch (error) {
            return new Error('Sync has failed');
        }
    }
    async getClients() {
        const clients = await this.http
            .get(`${harvestUrl}clients`, {
            headers: this.headersRequest,
        })
            .toPromise();
        return clients.data.clients;
    }
    async saveClients() {
        try {
            const clients = await this.getClients();
            for (const client of clients) {
                const alreadyExists = await this.clientRepository.findOne({
                    where: {
                        harvest_id: client.id,
                    },
                });
                if (alreadyExists) {
                    continue;
                }
                const newClient = new client_dto_1.ClientDto();
                newClient.harvest_id = client.id;
                newClient.name = client.name;
                newClient.is_active = client.is_active;
                this.clientRepository.insert(newClient);
            }
        }
        catch (error) {
            return new Error('Sync has failed');
        }
    }
    async getBudgetReports() {
        const report = await this.http
            .get(`${harvestUrl}reports/project_budget`, {
            headers: this.headersRequest,
        })
            .toPromise();
        return report.data.results;
    }
    async saveBudgetReports() {
        try {
            const connection = typeorm_2.getConnection();
            const budgetReports = await this.getBudgetReports();
            for (const report of budgetReports) {
                const alreadyExists = await this.budgetReportRepository.findOne({
                    where: {
                        project: report.project_id,
                    },
                });
                if (alreadyExists) {
                    continue;
                }
                const newReport = new budgetReport_entity_1.BudgetReport();
                newReport.project = report.project_id;
                newReport.clients = report.client_id;
                newReport.budget = Math.floor(report.budget);
                newReport.budget_remaining = Math.floor(report.budget_remaining);
                newReport.budget_spent = Math.floor(report.budget_spent);
                newReport.is_active = report.is_active;
                await connection.manager.save(newReport);
            }
        }
        catch (error) {
            return new Error('Sync has failed');
        }
    }
    async getTimeEntries() {
        const timeEntry = await this.http
            .get(`${harvestUrl}time_entries`, {
            headers: this.headersRequest,
        })
            .toPromise();
        return timeEntry.data.time_entries;
    }
    async saveTimeEntries() {
        try {
            const connection = typeorm_2.getConnection();
            const timeEntries = await this.getTimeEntries();
            for (const entry of timeEntries) {
                const alreadyExists = await this.timeEntryRepository.findOne({
                    where: {
                        harvest_id: entry.id,
                        project: entry.project.id,
                        user: entry.user.id,
                        user_assignment: entry.user_assignment.id,
                    },
                });
                if (alreadyExists) {
                    continue;
                }
                const newEntry = new timeEntry_entity_1.TimeEntry();
                newEntry.harvest_id = entry.id;
                newEntry.project = entry.project.id;
                newEntry.user = entry.user.id;
                newEntry.user_assignment = entry.user_assignment.id;
                newEntry.billable_rate = Math.floor(entry.billable_rate);
                newEntry.cost_rate = Math.floor(entry.cost_rate);
                newEntry.hours = Math.floor(entry.hours);
                newEntry.spend_date = new Date(entry.spent_date);
                await connection.manager.save(newEntry);
            }
        }
        catch (error) {
            return new Error('Sync has failed');
        }
    }
    async getUserAssignments() {
        const userAssignments = await this.http
            .get(`${harvestUrl}user_assignments`, {
            headers: this.headersRequest,
        })
            .toPromise();
        return userAssignments.data.user_assignments;
    }
    async saveUserAssignments() {
        try {
            const connection = typeorm_2.getConnection();
            const userAssignments = await this.getUserAssignments();
            for (const assignment of userAssignments) {
                const alreadyExists = await this.userAssignmentRepository.findOne({
                    where: {
                        harvest_id: assignment.id,
                        project: assignment.project.id,
                        user: assignment.user.id,
                    },
                });
                if (alreadyExists) {
                    continue;
                }
                const newAssignment = new userAssignment_entity_1.UserAssignment();
                newAssignment.harvest_id = assignment.id;
                newAssignment.budget = assignment.budget;
                newAssignment.hourly_rate = assignment.hourly_rate;
                newAssignment.project = assignment.project.id;
                newAssignment.user = assignment.user.id;
                await connection.manager.save(newAssignment);
            }
        }
        catch (error) {
            return new Error('Sync has failed');
        }
    }
};
HarvestService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_entity_1.Project)),
    __param(1, typeorm_1.InjectRepository(budgetReport_entity_1.BudgetReport)),
    __param(2, typeorm_1.InjectRepository(client_entity_1.Client)),
    __param(3, typeorm_1.InjectRepository(timeEntry_entity_1.TimeEntry)),
    __param(4, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(5, typeorm_1.InjectRepository(userAssignment_entity_1.UserAssignment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        common_1.HttpService])
], HarvestService);
exports.HarvestService = HarvestService;
//# sourceMappingURL=harvest.service.js.map