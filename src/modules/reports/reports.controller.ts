import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportDto } from './dto/report.dto';

@ApiTags('v1/admin/reports')
@Controller('v1/admin/reports')

export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({summary: 'دریافت گزارش بر اساس بازه زمانی'})
  getReports(@Query() query: ReportDto){
    return this.reportsService.getReports(query)
  }
}
