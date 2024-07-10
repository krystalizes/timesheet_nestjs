import { IsDateString, IsOptional } from 'class-validator';

export class StartEndDateDto {
  @IsOptional()
  @IsDateString()
  start_date: Date;
  @IsOptional()
  @IsDateString()
  end_date: Date;
}
