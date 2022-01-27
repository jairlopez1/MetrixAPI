import { HttpService, Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Board } from './entities/board.entity';
import { Sprint } from './entities/sprint.entity';
import { Issue } from './entities/issue.entity';

@Injectable()
export class JiraService {
  constructor(private http: HttpService) {}

  /**
   * It stores all boards labeled as scrum projects
   * and it calls method to get projects' sprints.
   * @returns { Array<Board> }
   */
  async syncProjects() {
    let boards;
    let startAt = 300;
    const result = [];
    const connection = getConnection();

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
          const boardToSave = new Board();
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

  /**
   * It stores sprints for a specific project
   * and it calls method to get its issues
   * @param boardId
   * @param savedBoard
   * @returns { Array<Sprint> }
   */
  async getSprints(boardId: number, savedBoard: Board) {
    let sprints;
    let startAt = 0;
    const result = [];
    const connection = getConnection();

    const headersRequest = {
      Authorization: `Basic ${process.env.JIRA_TOKEN}`,
      'Content-Type': 'application/json',
    };

    do {
      sprints = await this.http
        .get(
          `${process.env.JIRA_URL}board/${boardId}/sprint?startAt=${startAt}`,
          {
            headers: headersRequest,
          },
        )
        .toPromise();

      for (const sprint of sprints.data.values) {
        const sprintToSave = new Sprint();
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

  /**
   * It stores issues for a specific sprint
   * @param boardId
   * @param sprintId
   * @param savedSprint
   * @returns { Array<Issue> }
   */
  async getIssues(boardId: number, sprintId: number, savedSprint: Sprint) {
    const maxResults = 1000;
    const connection = getConnection();

    const headersRequest = {
      Authorization: `Basic ${process.env.JIRA_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const issues = await this.http
      .get(
        `${process.env.JIRA_URL}board/${boardId}/sprint/${sprintId}/issue?maxResults=${maxResults}`,
        {
          headers: headersRequest,
        },
      )
      .toPromise();

    for (const issue of issues.data.issues) {
      const issueToSave = new Issue();
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

  /**
   * It returns sprints for a specific project
   * @param id
   * @returns { Array<Sprint> }
   */
  async getSprintsByProjectId(id: number) {
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

  /**
   * It returns issues for a specific sprint
   * @param id
   * @returns { Array<Issue> }
   */
  async getIssuesBySprintId(id: number) {
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
}
