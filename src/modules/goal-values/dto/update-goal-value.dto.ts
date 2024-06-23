import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGoalValueDto } from './create-goal-value.dto';

export class UpdateGoalValueDto extends PartialType(CreateGoalValueDto) {
  @ApiProperty()
  value: number

  @ApiProperty()
  goalId: number

  @ApiProperty({example: '2024-01-01'})
  startDate: any;

  @ApiProperty({example: '2024-02-01'})
  endDate: any;
}
