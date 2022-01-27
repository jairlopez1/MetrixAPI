import { HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BudgetReport } from './entities/budgetReport.entity';
import { Client } from './entities/client.entity';
import { TimeEntry } from './entities/timeEntry.entity';
import { User } from './entities/user.entity';
import { UserAssignment } from './entities/userAssignment.entity';
export declare class HarvestService {
    private readonly projectRepository;
    private readonly budgetReportRepository;
    private readonly clientRepository;
    private readonly timeEntryRepository;
    private readonly userRepository;
    private readonly userAssignmentRepository;
    private http;
    constructor(projectRepository: Repository<Project>, budgetReportRepository: Repository<BudgetReport>, clientRepository: Repository<Client>, timeEntryRepository: Repository<TimeEntry>, userRepository: Repository<User>, userAssignmentRepository: Repository<UserAssignment>, http: HttpService);
    headersRequest: {
        'Content-Type': string;
        Authorization: string;
        'Harvest-Account-Id': string;
    };
    getProjects(): Promise<any>;
    saveProjects(): Promise<Error>;
    getUsers(): Promise<any>;
    saveUsers(): Promise<Error>;
    getClients(): Promise<any>;
    saveClients(): Promise<Error>;
    getBudgetReports(): Promise<any>;
    saveBudgetReports(): Promise<Error>;
    getTimeEntries(): Promise<any>;
    saveTimeEntries(): Promise<Error>;
    getUserAssignments(): Promise<any>;
    saveUserAssignments(): Promise<Error>;
}
