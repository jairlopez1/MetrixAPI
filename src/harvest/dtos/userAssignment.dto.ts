import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserAssignmentDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  harvest_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  project_id: number;

  @IsNumber()
  budget: number;

  @IsNumber()
  hourly_rate: number;
}
