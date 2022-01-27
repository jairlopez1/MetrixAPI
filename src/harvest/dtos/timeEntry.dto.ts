import { IsNotEmpty } from 'class-validator';

export class TimeEntryDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  harvest_id: number;

  @IsNotEmpty()
  project_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  user_assignment_id: number;

  spend_date: string;

  hours: number;

  billable_rate: number;

  cost_rate: number;
}
