import { EntityNames } from "src/common/enums/entity.enum";
import { Column, Entity, OneToMany } from "typeorm";
import { DepartmentStatus } from "../enums/status.enum";
import { BaseEntity } from "src/common/abstract/base.entity";
import { IndicatorEntity } from "src/modules/indicators/entities/indicator.entity";


@Entity(EntityNames.Department)
export class DepartmentEntity extends BaseEntity {
    @Column()
    name: string

    @Column({ enum: DepartmentStatus, default: DepartmentStatus.ACTIVE })
    status: string

    @OneToMany(() => IndicatorEntity, indicator => indicator.department)
    indicators: IndicatorEntity[]

}
