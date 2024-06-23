import { Injectable } from '@nestjs/common';
import { GoalsService } from '../../goals/goals.service';
import { GoalEntity } from '../../goals/entities/goal.entity';


@Injectable()
export class GoalValuesFactoryClass {
  constructor(
    private readonly goalService: GoalsService,
  ) {
  }

  public async findOneGoalById(goalId: number): Promise<GoalEntity | Error> {
    return await this.goalService.findOneById(goalId);
  }


}
