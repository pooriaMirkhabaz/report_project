import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { GoalValuesService } from './goal-values.service';
import { CreateGoalValueDto } from './dto/create-goal-value.dto';
import { UpdateGoalValueDto } from './dto/update-goal-value.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enums/swagger.consumes';

@ApiTags('v1/admin/goal-values')
@Controller('v1/admin/goal-values')

export class GoalValuesController {
  constructor(private readonly goalValuesService: GoalValuesService) {
  }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: 'ذخیره مقدار برای یک هدف' })
  create(@Body() createGoalValueDto: CreateGoalValueDto) {
    return this.goalValuesService.create(createGoalValueDto);
  }


  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: 'ویرایش آیتم' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGoalValueDto: UpdateGoalValueDto) {
    return this.goalValuesService.update(id, updateGoalValueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف آیتم' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goalValuesService.remove(id);
  }
}
