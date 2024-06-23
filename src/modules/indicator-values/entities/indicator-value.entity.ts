import { BaseEntity } from "src/common/abstract/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { IndicatorEntity } from "src/modules/indicators/entities/indicator.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityNames.IndicatorValues)
export class IndicatorValuesEntity extends BaseEntity {

    @Column()
    value: number;


    @Column({type: "date", default: "2024-06-22"})
    startDate: Date;

    @Column({type: "date", default: "2024-07-22"})
    endDate: Date;

    @ManyToOne(() => IndicatorEntity, indicator => indicator.values, { onDelete: 'CASCADE' })
    indicator: IndicatorEntity
}
