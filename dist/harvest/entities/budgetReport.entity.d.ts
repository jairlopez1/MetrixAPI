import { Client } from './client.entity';
import { Project } from './project.entity';
export declare class BudgetReport {
    id: number;
    is_active: boolean;
    budget: number;
    budget_spent: number;
    budget_remaining: number;
    project: Project;
    clients: Client[];
}
