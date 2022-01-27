import { BudgetReport } from './budgetReport.entity';
export declare class Client {
    id: number;
    harvest_id: number;
    name: string;
    is_active: boolean;
    budgetReports: BudgetReport[];
}
