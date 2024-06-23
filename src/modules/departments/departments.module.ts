import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import DepartmentAdminTransformer from './transformer';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentAdminTransformer],
  exports: [DepartmentsService, DepartmentAdminTransformer, DepartmentsModule]
})
export class DepartmentsModule { }
