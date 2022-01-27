import { HttpService } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Sprint } from './entities/sprint.entity';
export declare class JiraService {
    private http;
    constructor(http: HttpService);
    syncProjects(): Promise<string>;
    getSprints(boardId: number, savedBoard: Board): Promise<any[]>;
    getIssues(boardId: number, sprintId: number, savedSprint: Sprint): Promise<any>;
    getAllProjects(): Promise<any>;
    getSprintsByProjectId(id: number): Promise<any>;
    getIssuesBySprintId(id: number): Promise<any>;
}
