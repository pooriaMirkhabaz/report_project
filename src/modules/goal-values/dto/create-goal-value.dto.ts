import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalValueDto {
  @ApiProperty()
  value: number

  @ApiProperty()
  goalId: number

  @ApiProperty({example: '2024-01-01'})
  startDate: any;

  @ApiProperty({example: '2024-02-01'})
  endDate: any;
}
