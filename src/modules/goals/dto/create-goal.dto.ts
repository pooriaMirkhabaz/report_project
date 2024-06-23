import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateGoalDto {

    @ApiProperty()
    indicatorId: number

    @ApiProperty()
    @Length(3, 30)
    name: string

    @ApiProperty()
    target_value: number;

}
