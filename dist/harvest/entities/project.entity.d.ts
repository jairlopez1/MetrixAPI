import { BudgetReport } from './budgetReport.entity';
import { TimeEntry } from './timeEntry.entity';
import { UserAssignment } from './userAssignment.entity';
export declare class Project {
    id: number;
    harvest_id: number;
    name: string;
    is_active: boolean;
    budgetReport: BudgetReport;
    userAssignments: UserAssignment[];
    timeEntries: TimeEntry[];
}
