import { Injectable } from "@nestjs/common";
import { DepartmentsService } from '../../departments/departments.service';
import { DepartmentEntity } from '../../departments/entities/department.entity';


@Injectable()
export class ReportsFactoryClass {
    constructor(
        private readonly departmentsService: DepartmentsService
    ) { }

    public async findDepartmentsForReport(relations: string[]): Promise<DepartmentEntity[]> {
        return await this.departmentsService.findDepartmentsForReport(relations)
    }

}
