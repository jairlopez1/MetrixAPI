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
exports.HarvestController = void 0;
const common_1 = require("@nestjs/common");
const harvest_service_1 = require("./harvest.service");
let HarvestController = class HarvestController {
    constructor(harvestService) {
        this.harvestService = harvestService;
    }
    async syncDatabase() {
        try {
            await this.harvestService.saveProjects();
            await this.harvestService.saveUsers();
            await this.harvestService.saveClients();
            await this.harvestService.saveBudgetReports();
            await this.harvestService.saveUserAssignments();
            await this.harvestService.saveTimeEntries();
            return 'Done!';
        }
        catch (error) {
            return 'Synchronization has failed';
        }
    }
    async getProjects() {
        return await this.harvestService.getProjects();
    }
    async getUsers() {
        return await this.harvestService.getUsers();
    }
    async getClients() {
        return await this.harvestService.getClients();
    }
    async getBudgetReports() {
        return await this.harvestService.getBudgetReports();
    }
    async getTimeEntries() {
        return await this.harvestService.getTimeEntries();
    }
    async getUserAssignments() {
        return await this.harvestService.getUserAssignments();
    }
};
__decorate([
    common_1.Get('sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "syncDatabase", null);
__decorate([
    common_1.Get('projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "getProjects", null);
__decorate([
    common_1.Get('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "getUsers", null);
__decorate([
    common_1.Get('clients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "getClients", null);
__decorate([
    common_1.Get('budget_reports'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "getBudgetReports", null);
__decorate([
    common_1.Get('time_entries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "getTimeEntries", null);
__decorate([
    common_1.Get('user_assignments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HarvestController.prototype, "getUserAssignments", null);
HarvestController = __decorate([
    common_1.Controller('harvest'),
    __metadata("design:paramtypes", [harvest_service_1.HarvestService])
], HarvestController);
exports.HarvestController = HarvestController;
//# sourceMappingURL=harvest.controller.js.map