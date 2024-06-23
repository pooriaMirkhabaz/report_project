import { EntityNames } from "src/common/enums/entity.enum";
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IndicatorTypes } from "../enums/indicator.types.enum";
import { BaseEntity } from "src/common/abstract/base.entity";
import { DepartmentEntity } from "src/modules/departments/entities/department.entity";
import { GoalEntity } from "src/modules/goals/entities/goal.entity";
import { IndicatorValuesEntity } from '../../indicator-values/entities/indicator-value.entity';


@Entity(EntityNames.Indicator)
export class IndicatorEntity extends BaseEntity {

    @Column()
    name: string

    @Column({ enum: IndicatorTypes })
    type: IndicatorTypes

    @ManyToOne(() => DepartmentEntity, department => department.indicators, { onDelete: 'CASCADE' })
    department: DepartmentEntity

    @OneToMany(() => GoalEntity, goal => goal.indicator)
    goals: GoalEntity[]


    @OneToMany(() => IndicatorValuesEntity, values => values.indicator)
    values: IndicatorValuesEntity[]


}
