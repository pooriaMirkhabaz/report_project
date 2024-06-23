import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalValueDto } from './dto/create-goal-value.dto';
import { UpdateGoalValueDto } from './dto/update-goal-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalValuesEntity } from './entities/goal-value.entity';
import { Repository } from 'typeorm';
import { GoalValuesFactoryClass } from './factories/goal-factory.factory';
import { GoalEntity } from '../goals/entities/goal.entity';
import { NotFoundMessage, PublicMessage } from '../../common/enums/messages';

@Injectable()
export class GoalValuesService {
  constructor(
    @InjectRepository(GoalValuesEntity) private readonly valuesRepository: Repository<GoalValuesEntity>,
    private readonly goalValuesFactoryClass: GoalValuesFactoryClass,
  ) {
  }

  public async create(createGoalValueDto: CreateGoalValueDto) {
    const { value, goalId, endDate, startDate } = createGoalValueDto;

    const goal = await this.goalValuesFactoryClass.findOneGoalById(createGoalValueDto.goalId) as GoalEntity;
    let goalValue = await this.valuesRepository.create({ value, startDate, endDate });

    goalValue.goal = goal;
    await this.valuesRepository.save(goalValue);

    return {
      statusCode: HttpStatus.CREATED,
      message: PublicMessage.CreatedResponse,
    };
  }

  public async update(id: number, updateGoalValueDto: UpdateGoalValueDto) {
    const { value, goalId, endDate, startDate } = updateGoalValueDto;

    const goal = await this.goalValuesFactoryClass.findOneGoalById(goalId) as GoalEntity;
    let goalValue = await this.findOneById(id) as GoalValuesEntity;

    goalValue.value = value;
    goalValue.goal = goal;
    goalValue.endDate = endDate;
    goalValue.startDate = startDate;
    await this.valuesRepository.save(goalValue);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Updated
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


  public async findOneById(id: number): Promise<GoalValuesEntity | Error> {
    const value = await this.valuesRepository.findOneBy({ id });
    if (!value) {
      throw new NotFoundException(NotFoundMessage.NotFoundGoalValue);
    }
    return value;
  }


}
