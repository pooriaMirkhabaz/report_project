import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGoalDto } from './create-goal.dto';
import { Length } from 'class-validator';

export class UpdateGoalDto extends PartialType(CreateGoalDto) {

  @ApiProperty()
  indicatorId: number

  @ApiProperty()
  @Length(3, 30)
  name: string

  @ApiProperty()
  target_value: number;
}
