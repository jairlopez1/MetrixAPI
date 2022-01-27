import { Controller, Get } from '@nestjs/common';
import { HarvestService } from './harvest.service';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get('sync')
  async syncDatabase() {
    try {
      await this.harvestService.saveProjects();
      await this.harvestService.saveUsers();
      await this.harvestService.saveClients();
      await this.harvestService.saveBudgetReports();
      await this.harvestService.saveUserAssignments();
      await this.harvestService.saveTimeEntries();
      return 'Done!';
    } catch (error) {
      return 'Synchronization has failed';
    }
  }

  @Get('projects')
  async getProjects(): Promise<any> {
    return await this.harvestService.getProjects();
  }

  @Get('users')
  async getUsers(): Promise<any> {
    return await this.harvestService.getUsers();
  }

  @Get('clients')
  async getClients(): Promise<any> {
    return await this.harvestService.getClients();
  }

  @Get('budget_reports')
  async getBudgetReports(): Promise<any> {
    return await this.harvestService.getBudgetReports();
  }

  @Get('time_entries')
  async getTimeEntries(): Promise<any> {
    return await this.harvestService.getTimeEntries();
  }

  @Get('user_assignments')
  async getUserAssignments(): Promise<any> {
    return await this.harvestService.getUserAssignments();
  }
}
