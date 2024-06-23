import { Injectable } from "@nestjs/common";
import { DepartmentsService } from "src/modules/departments/departments.service";
import { DepartmentEntity } from "src/modules/departments/entities/department.entity";


@Injectable()
export class IndicatorFactoryClass {
    constructor(
        private readonly departmentsService: DepartmentsService
    ) { }

    public async findOneDepartmentById(departmentId: number): Promise<DepartmentEntity | Error> {
        return await this.departmentsService.findOneById(departmentId)
    }

}
