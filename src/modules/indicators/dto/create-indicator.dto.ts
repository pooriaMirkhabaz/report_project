import { IsEnum, IsNumber, Length } from "class-validator";
import { IndicatorTypes } from "../enums/indicator.types.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateIndicatorDto {
    @ApiProperty()
    @IsNumber()
    departmentId: number

    @ApiProperty()
    @Length(5, 50)
    name: string

    @ApiProperty({ enum: IndicatorTypes, default: IndicatorTypes.Intermediate })
    @IsEnum(IndicatorTypes)
    type: IndicatorTypes
}
