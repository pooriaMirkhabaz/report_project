import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({ example: '2024-01-01', default: '2024-01-01' })
  start_date: Date;

  @ApiProperty({ example: '2024-02-01', default: '2024-02-01' })
  end_date: Date;
}
