import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  harvest_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  cost_rate: number;

  roles: string[];
}
