import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/messages';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginationGenerator, PaginationSolver } from '../../common/utils/paginatio.util';
import DepartmentAdminTransformer from './transformer';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(DepartmentEntity) private readonly departmentRepository: Repository<DepartmentEntity>,
    private readonly departmentAdminTransformer: DepartmentAdminTransformer
  ) { }

  public async create(createDepartmentDto: CreateDepartmentDto) {
    await this.checkDepartmentName(createDepartmentDto.name)

    const result = await this.departmentRepository.insert({ name: createDepartmentDto.name })
    const transformer = result.generatedMaps[0]
    transformer.name = createDepartmentDto.name

    return {
      statusCode: HttpStatus.CREATED,
      message: PublicMessage.CreatedResponse,
      data: transformer
    }
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page, limit, skip } = PaginationSolver(paginationDto)

    const [departments, count] = await this.departmentRepository.findAndCount({
      select: {
        indicators: {
          id: true,
          name: true,
          type: true
        }
      },
      relations: ["indicators"],
      skip, take: limit, order: { id: "DESC" }
    })
    const transformer = this.departmentAdminTransformer.collection(departments)

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.OkResponse,
      data: {
        data: transformer,
        metadata: PaginationGenerator(count, page, limit)
      }
    }
  }

  public async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    let department = await this.findOneById(id)
    department.name = updateDepartmentDto.name
    const result = await this.departmentRepository.save(department)

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Updated,
      data: result
    }
  }

  public async remove(id: number) {
    await this.findOneById(id)
    await this.departmentRepository.delete({ id })

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Deleted,
    }
  }

  private async checkDepartmentName(name: string): Promise<DepartmentEntity | Error> {
    const department = await this.departmentRepository.findOne({ where: { name } })
    if (department) {
      throw new ConflictException(ConflictMessage.ExistDepartmentTitle)
    }
    return department
  }

  public async findOneById(id: number): Promise<DepartmentEntity | Error> {
    const department = await this.departmentRepository.findOneBy({ id })
    if (!department) {
      throw new NotFoundException(NotFoundMessage.NotFoundDepartment)
    }
    return department
  }

  public async findDepartmentsForReport(relations: string[]): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find({ relations })
  }

}
