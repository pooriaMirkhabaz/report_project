import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIndicatorValueDto } from './create-indicator-value.dto';

export class UpdateIndicatorValueDto extends PartialType(CreateIndicatorValueDto) {
  @ApiProperty()
  value: number

  @ApiProperty()
  indicatorId: number

  @ApiProperty({example: '2024-01-01'})
  startDate: any;

  @ApiProperty({example: '2024-02-01'})
  endDate: any;
}
