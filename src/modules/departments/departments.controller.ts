import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.consumes';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags("v1/admin/departments")
@Controller('v1/admin/departments')

export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: "ذخیره دپارتمان جدید" })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: "لیست دپارتمان ها" })
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.departmentsService.findAll(paginationDto);
  }


  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiOperation({ summary: "ویرایش دپارتمان" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "حذف دپارتمان" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id);
  }
}
