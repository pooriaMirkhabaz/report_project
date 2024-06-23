import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('v1/admin/indicators')
@Controller('v1/admin/indicators')

export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: "ذخیره شاخص جدید" })
  create(@Body() createIndicatorDto: CreateIndicatorDto) {
    return this.indicatorsService.create(createIndicatorDto);
  }

  @Get()
  @ApiOperation({ summary: "لیست شاخص ها" })
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.indicatorsService.findAll(paginationDto);
  }


  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: "ویرایش شاخص" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateIndicatorDto: UpdateIndicatorDto) {
    return this.indicatorsService.update(id, updateIndicatorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "حذف شاخص" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorsService.remove(id);
  }
}
