import { HarvestService } from './harvest.service';
export declare class HarvestController {
    private readonly harvestService;
    constructor(harvestService: HarvestService);
    syncDatabase(): Promise<"Done!" | "Synchronization has failed">;
    getProjects(): Promise<any>;
    getUsers(): Promise<any>;
    getClients(): Promise<any>;
    getBudgetReports(): Promise<any>;
    getTimeEntries(): Promise<any>;
    getUserAssignments(): Promise<any>;
}
