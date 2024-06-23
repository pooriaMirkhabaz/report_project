import { PaginationDto } from '../dtos/pagination.dto';

export function PaginationSolver(paginationDto: PaginationDto) {
    let { page, limit } = paginationDto
    if (!page || page <= 0) page = 0
    else page = page - 1
    if (!limit || limit <= 0) limit = 10
    const skip = page * limit

    return {
        page,
        limit,
        skip
    }
}

export function PaginationGenerator(count: number = 0, page: number = 0, limit: number = 0) {
    const totalPage = Math.ceil(count / limit)

    return {
        totalPage: totalPage,
        totalCount: count,
        page: +page,
        limit: +limit,
        next: page < totalPage,
        back: page > 1
    }
}