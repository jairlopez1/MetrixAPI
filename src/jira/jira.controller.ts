import { Controller, Get, Param } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('sync')
  syncProjects() {
    return this.jiraService.syncProjects();
  }

  @Get('projects')
  getAllProjects() {
    return this.jiraService.getAllProjects();
  }

  @Get('projects/:id')
  getSprintsByProjectId(@Param('id') id: number) {
    return this.jiraService.getSprintsByProjectId(id);
  }

  @Get('sprints/:id')
  getIssuesBySprintId(@Param('id') id: number) {
    return this.jiraService.getIssuesBySprintId(id);
  }
}
