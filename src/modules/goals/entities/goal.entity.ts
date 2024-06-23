export class Goal { }

import { BaseEntity } from "src/common/abstract/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { GoalValuesEntity } from "src/modules/goal-values/entities/goal-value.entity";
import { IndicatorEntity } from "src/modules/indicators/entities/indicator.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { GoalsStatus } from "../enums/status.enum";


@Entity(EntityNames.Goal)
export class GoalEntity extends BaseEntity {

    @Column()
    name: string

    @Column({default: 0})
    targetValue: number;

    @Column({ enum: GoalsStatus, default: GoalsStatus.PENDING })
    status: GoalsStatus;

    @ManyToOne(() => IndicatorEntity, indicator => indicator.goals, { onDelete: 'CASCADE' })
    indicator: IndicatorEntity

    @OneToMany(() => GoalValuesEntity, values => values.goal)
    values: GoalValuesEntity[]

}
