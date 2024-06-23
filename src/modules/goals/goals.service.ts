import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalEntity } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { GoalFactoryClass } from './factories/goal.factory';
import { IndicatorEntity } from '../indicators/entities/indicator.entity';
import { ConflictMessage, NotFoundMessage, PublicMessage } from '../../common/enums/messages';
import { PaginationGenerator, PaginationSolver } from '../../common/utils/paginatio.util';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import GoalsAdminTransformer from './transformer';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalEntity) private goalRepository: Repository<GoalEntity>,
    private readonly goalFactory: GoalFactoryClass,
    private readonly goalsAdminTransformer: GoalsAdminTransformer,
  ) {
  }

  public async create(createGoalDto: CreateGoalDto) {
    const { name, target_value, indicatorId } = createGoalDto;
    await this.checkExistGoal(indicatorId, name);

    const indicator = await this.goalFactory.findOneIndicatorById(indicatorId) as IndicatorEntity;
    let goal = await this.goalRepository.create({ name, targetValue: target_value });
    goal.indicator = indicator;
    await this.goalRepository.save(goal);

    return {
      statusCode: HttpStatus.CREATED,
      message: PublicMessage.CreatedResponse,

    };
  }

  public async findAll(paginationDto: PaginationDto) {
    const { skip, limit, page } = PaginationSolver(paginationDto);

    const [goals, count] = await this.goalRepository.findAndCount({
      select: {
        values: {
          id: true,
          value: true,
          createdAt: true,
        },
      },
      relations: ['values'],
      skip: skip,
      take: limit,
      order: { id: 'desc' },
    });


    const transformer = this.goalsAdminTransformer.collection((goals));
    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.OkResponse,
      data: {
        data: transformer,
        metadata: PaginationGenerator(count, page, limit),
      },

    };
  }

  public async update(id: number, updateGoalDto: UpdateGoalDto) {
    const { name, target_value, indicatorId } = updateGoalDto;

    const goal = await this.findOneById(id) as GoalEntity;
    const indicator = await this.goalFactory.findOneIndicatorById(indicatorId) as IndicatorEntity;

    goal.name = name;
    goal.targetValue = target_value;
    goal.indicator = indicator;
    await this.goalRepository.save(goal);

    const transformer = this.goalsAdminTransformer.transform(goal);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Updated,
      data: transformer,
    };
  }

  public async remove(id: number) {
    await this.findOneById(id) as GoalEntity;
    await this.goalRepository.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.Deleted,
    };
  }

  public async findOneById(id: number): Promise<GoalEntity | Error> {
    const goal = await this.goalRepository.findOneBy({ id });
    if (!goal) {
      throw new NotFoundException(NotFoundMessage.NotFoundGoal);
    }
    return goal;
  }

  private async checkExistGoal(indicatorId: number, name: string): Promise<GoalEntity | Error> {
    const goal = await this.goalRepository.findOneBy({ name, indicator: { id: indicatorId } });
    if (goal) {
      throw new ConflictException(ConflictMessage.ExistGoalTitle);
    }
    return goal;
  }
}
