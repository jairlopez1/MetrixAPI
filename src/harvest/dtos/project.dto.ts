import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  harvest_id: number;

  @IsString()
  name: string;

  @IsBoolean()
  is_active: boolean;
}
