import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@ApiTags("v1/admin/goals")
@Controller('v1/admin/goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: "ذخیره هدف جدید" })
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  @ApiOperation({ summary: "لیست هدف های ثبت شده" })
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.goalsService.findAll(paginationDto);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: "ویرایش هدف" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "حذف هدف" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goalsService.remove(id);
  }
}
