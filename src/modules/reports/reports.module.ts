import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportsFactoryClass } from './factories/report.factory';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [DepartmentsModule],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsFactoryClass],
})
export class ReportsModule {}
