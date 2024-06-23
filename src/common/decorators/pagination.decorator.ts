import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function Pagination() {
    return applyDecorators(
        ApiQuery({ name: 'page', type: "integer" }),
        ApiQuery({ name: 'limit', type: "integer" })
    )
}