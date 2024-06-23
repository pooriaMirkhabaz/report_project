import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { IndicatorValuesService } from './indicator-values.service';
import { CreateIndicatorValueDto } from './dto/create-indicator-value.dto';
import { UpdateIndicatorValueDto } from './dto/update-indicator-value.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enums/swagger.consumes';

@ApiTags('v1/admin/indicator-values')
@Controller('v1/admin/indicator-values')

export class IndicatorValuesController {
  constructor(private readonly goalValuesService: IndicatorValuesService) {
  }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: 'ذخیره مقدار برای یک شاخص' })
  create(@Body() createGoalValueDto: CreateIndicatorValueDto) {
    return this.goalValuesService.create(createGoalValueDto);
  }


  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: 'ویرایش آیتم' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGoalValueDto: UpdateIndicatorValueDto) {
    return this.goalValuesService.update(id, updateGoalValueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف آیتم' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goalValuesService.remove(id);
  }
}
