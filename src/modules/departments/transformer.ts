import { Injectable } from "@nestjs/common";
import { ITransformer } from "src/common/contracts/ITransformer";
import { DepartmentEntity } from "./entities/department.entity";

@Injectable()
export default class DepartmentAdminTransformer implements ITransformer<DepartmentEntity> {
    public transform(item: DepartmentEntity) {
        return {
            id: item.id,
            name: item.name,
            status: item.status,
            createdAt: item.createdAt,
            indicators: item.indicators,
        }
    }

    public collection(items: DepartmentEntity[]) {
        return items.map((item: DepartmentEntity) => this.transform(item))
    }

}