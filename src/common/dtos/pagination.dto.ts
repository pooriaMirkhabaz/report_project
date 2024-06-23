import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
    @ApiProperty({ name: "page", type: "integer", default: 1, required: false })
    page: number
    @ApiProperty({ name: "limit", type: "integer", default: 10, required: false })
    limit: number
}