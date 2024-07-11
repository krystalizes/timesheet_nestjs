import { OmitType } from '@nestjs/swagger';
import { StartEndDateDto } from './start-end-date.dto';

export class StartDateDto extends OmitType(StartEndDateDto, [
  'end_date',
] as const) {}
