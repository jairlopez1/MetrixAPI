import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class BudgetReportDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  client_id: number;

  @IsNotEmpty()
  project_id: number;

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  budget: number;

  @IsNumber()
  budget_spent: number;

  @IsNumber()
  budget_remaining: number;
}
