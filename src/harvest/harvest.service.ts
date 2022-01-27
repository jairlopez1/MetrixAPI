import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { ProjectDto } from './dtos/project.dto';
import { Project } from './entities/project.entity';
import { BudgetReport } from './entities/budgetReport.entity';
import { ClientDto } from './dtos/client.dto';
import { Client } from './entities/client.entity';
import { TimeEntry } from './entities/timeEntry.entity';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserAssignment } from './entities/userAssignment.entity';

const harvestToken = process.env.HARVEST_TOKEN;
const harvestAccountId = process.env.HARVEST_ACCOUNT_ID;
const harvestUrl = process.env.HARVEST_URL;

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(BudgetReport)
    private readonly budgetReportRepository: Repository<BudgetReport>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(TimeEntry)
    private readonly timeEntryRepository: Repository<TimeEntry>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserAssignment)
    private readonly userAssignmentRepository: Repository<UserAssignment>,

    private http: HttpService,
  ) {}

  headersRequest = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${harvestToken}`,
    'Harvest-Account-Id': `${harvestAccountId}`,
  };

  async getProjects(): Promise<any> {
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
        const newProject = new ProjectDto();
        newProject.harvest_id = project.id;
        newProject.name = project.name;
        newProject.is_active = project.is_active;

        this.projectRepository.insert(newProject);
      }
    } catch (error) {
      return new Error('Sync has failed');
    }
  }

  async getUsers(): Promise<any> {
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
        const newUser = new UserDto();
        newUser.harvest_id = user.id;
        newUser.first_name = user.first_name;
        newUser.last_name = user.last_name;
        newUser.is_active = user.is_active;
        newUser.cost_rate = user.cost_rate;
        newUser.roles = user.roles;
        this.userRepository.insert(newUser);
      }
    } catch (error) {
      return new Error('Sync has failed');
    }
  }

  async getClients(): Promise<any> {
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
        const newClient = new ClientDto();
        newClient.harvest_id = client.id;
        newClient.name = client.name;
        newClient.is_active = client.is_active;
        this.clientRepository.insert(newClient);
      }
    } catch (error) {
      return new Error('Sync has failed');
    }
  }

  async getBudgetReports(): Promise<any> {
    const report = await this.http
      .get(`${harvestUrl}reports/project_budget`, {
        headers: this.headersRequest,
      })
      .toPromise();
    return report.data.results;
  }

  async saveBudgetReports() {
    try {
      const connection = getConnection();
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
        const newReport = new BudgetReport();
        newReport.project = report.project_id;
        newReport.clients = report.client_id;
        newReport.budget = Math.floor(report.budget);
        newReport.budget_remaining = Math.floor(report.budget_remaining);
        newReport.budget_spent = Math.floor(report.budget_spent);
        newReport.is_active = report.is_active;
        await connection.manager.save(newReport);
      }
    } catch (error) {
      return new Error('Sync has failed');
    }
  }

  async getTimeEntries(): Promise<any> {
    const timeEntry = await this.http
      .get(`${harvestUrl}time_entries`, {
        headers: this.headersRequest,
      })
      .toPromise();
    return timeEntry.data.time_entries;
  }

  async saveTimeEntries() {
    try {
      const connection = getConnection();
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
        const newEntry = new TimeEntry();
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
    } catch (error) {
      return new Error('Sync has failed');
    }
  }

  async getUserAssignments(): Promise<any> {
    const userAssignments = await this.http
      .get(`${harvestUrl}user_assignments`, {
        headers: this.headersRequest,
      })
      .toPromise();
    return userAssignments.data.user_assignments;
  }

  async saveUserAssignments() {
    try {
      const connection = getConnection();
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
        const newAssignment = new UserAssignment();
        newAssignment.harvest_id = assignment.id;
        newAssignment.budget = assignment.budget;
        newAssignment.hourly_rate = assignment.hourly_rate;
        newAssignment.project = assignment.project.id;
        newAssignment.user = assignment.user.id;
        await connection.manager.save(newAssignment);
      }
    } catch (error) {
      return new Error('Sync has failed');
    }
  }
}
