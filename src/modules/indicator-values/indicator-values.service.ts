import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndicatorValueDto } from './dto/create-indicator-value.dto';
import { UpdateIndicatorValueDto } from './dto/update-indicator-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IndicatorValuesEntity } from './entities/indicator-value.entity';
import { Repository } from 'typeorm';
import { IndicatorValuesFactoryClass } from './factories/indicator-factory.factory';
import { NotFoundMessage, PublicMessage } from '../../common/enums/messages';
import { IndicatorEntity } from '../indicators/entities/indicator.entity';

@Injectable()
export class IndicatorValuesService {
  constructor(
    @InjectRepository(IndicatorValuesEntity) private readonly valuesRepository: Repository<IndicatorValuesEntity>,
    private readonly indicatorValuesFactoryClass: IndicatorValuesFactoryClass,
  ) {
  }

  public async create(createIndicatorValueDto: CreateIndicatorValueDto) {
    const indicator = await this.indicatorValuesFactoryClass.findOneIndicatorById(createIndicatorValueDto.indicatorId) as IndicatorEntity;

    let indicatorValue = await this.valuesRepository.create({ value: createIndicatorValueDto.value });
    indicatorValue.indicator = indicator;
    indicatorValue.value = createIndicatorValueDto.value
    indicatorValue.startDate = createIndicatorValueDto.startDate
    indicatorValue.endDate = createIndicatorValueDto.endDate
    await this.valuesRepository.save(indicatorValue);

    return {
      statusCode: HttpStatus.CREATED,
      message: PublicMessage.CreatedResponse,
    }
  }

  public async update(id: number, updateIndicatorValueDto: UpdateIndicatorValueDto) {
    const indicator = await this.indicatorValuesFactoryClass.findOneIndicatorById(updateIndicatorValueDto.indicatorId) as IndicatorEntity;
    let indicatorValue = await this.findOneById(id) as IndicatorValuesEntity;

    indicatorValue.indicator = indicator;
    indicatorValue.value = updateIndicatorValueDto.value
    indicatorValue.startDate = updateIndicatorValueDto.startDate
    indicatorValue.endDate = updateIndicatorValueDto.endDate
    await this.valuesRepository.save(indicatorValue);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Updated,

    };
  }

  public async remove(id: number) {
    await this.findOneById(id);
    await this.valuesRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Deleted,
    };
  }


  public async findOneById(id: number): Promise<IndicatorValuesEntity | Error> {
    const value = await this.valuesRepository.findOneBy({ id });
    if (!value) {
      throw new NotFoundException(NotFoundMessage.NotFoundIndicatorValue);
    }
    return value;
  }


}
