import { Project } from './project.entity';
import { User } from './user.entity';
import { UserAssignment } from './userAssignment.entity';
export declare class TimeEntry {
    id: number;
    harvest_id: number;
    spend_date: Date;
    hours: number;
    billable_rate: number;
    cost_rate: number;
    user: User;
    user_assignment: UserAssignment;
    project: Project;
}
