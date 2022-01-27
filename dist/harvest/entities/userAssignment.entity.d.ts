import { Project } from './project.entity';
import { TimeEntry } from './timeEntry.entity';
import { User } from './user.entity';
export declare class UserAssignment {
    id: number;
    harvest_id: number;
    budget: number;
    hourly_rate: number;
    user: User;
    project: Project;
    timeEntries: TimeEntry[];
}
