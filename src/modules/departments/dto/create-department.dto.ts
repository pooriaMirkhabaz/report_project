import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty()
    @Length(5, 40)
    @IsNotEmpty()
    name: string
}
