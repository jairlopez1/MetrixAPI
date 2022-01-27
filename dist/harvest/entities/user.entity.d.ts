import { TimeEntry } from './timeEntry.entity';
import { UserAssignment } from './userAssignment.entity';
export declare class User {
    id: number;
    harvest_id: number;
    first_name: string;
    last_name: string;
    is_active: boolean;
    cost_rate: number;
    roles: string[];
    userAssignments: UserAssignment[];
    timeEntries: TimeEntry[];
}
