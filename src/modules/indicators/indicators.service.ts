import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IndicatorEntity } from './entities/indicator.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/messages';
import { IndicatorTypes } from './enums/indicator.types.enum';
import IndicatorAdminTransformer from './transformer';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginationSolver, PaginationGenerator } from 'src/common/utils/paginatio.util';
import { IndicatorFactoryClass } from './factories/indicator.factory';

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(IndicatorEntity) private readonly indicatorRepository: Repository<IndicatorEntity>,
    private readonly indicatorFactoryClass: IndicatorFactoryClass,
    private readonly indicatorTransformer: IndicatorAdminTransformer,
  ) {
  }

  public async create(createIndicatorDto: CreateIndicatorDto) {
    await this.checkIndicatorName(createIndicatorDto.name, createIndicatorDto.type);
    const department = await this.indicatorFactoryClass.findOneDepartmentById(createIndicatorDto.departmentId);
    const result = await this.indicatorRepository.insert({
      name: createIndicatorDto.name,
      type: createIndicatorDto.type,
      department: department,
    });

    const indicator = result.generatedMaps[0];
    indicator.name = createIndicatorDto.name;
    indicator.type = createIndicatorDto.type;

    return {
      statusCode: HttpStatus.CREATED,
      message: PublicMessage.CreatedResponse,
      data: indicator,
    };
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page, limit, skip } = PaginationSolver(paginationDto);
    const [departments, count] = await this.indicatorRepository.findAndCount({
      select: {
        goals: {
          id: true,
          name: true,
          // year: true,
          // month: true,
          targetValue: true,
          status: true,
        },
      },
      relations: ['goals', 'values'],
      skip: skip,
      take: limit,
      order: { id: 'DESC' },
    });

    const transformer = this.indicatorTransformer.collection(departments);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.OkResponse,
      data: {
        data: transformer,
        metadata: PaginationGenerator(count, page, limit),
      },
    };
  }

  public async update(id: number, updateIndicatorDto: UpdateIndicatorDto) {
    const indicator = await this.findOneById(id) as IndicatorEntity;
    indicator.name = updateIndicatorDto.name;
    indicator.type = updateIndicatorDto.type;
    await this.indicatorRepository.save(indicator);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Updated,
      data: indicator,
    };
  }

  public async remove(id: number) {
    await this.findOneById(id) as IndicatorEntity;
    await this.indicatorRepository.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Deleted,
    };
  }

  public async findOneById(id: number): Promise<IndicatorEntity | Error> {
    const indicator = await this.indicatorRepository.findOneBy({ id });
    if (!indicator) {
      throw new NotFoundException(NotFoundMessage.NotFoundIndicator);
    }
    return indicator;
  }


  private async checkIndicatorName(name: string, type: IndicatorTypes): Promise<IndicatorEntity | Error> {
    const indicator = await this.indicatorRepository.findOne({ where: { name, type } });
    if (indicator) {
      throw new ConflictException(ConflictMessage.ExistIndicatorTitle);
    }
    return indicator;
  }


}
