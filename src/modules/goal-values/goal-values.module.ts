import { Module } from '@nestjs/common';
import { GoalValuesService } from './goal-values.service';
import { GoalValuesController } from './goal-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalValuesEntity } from './entities/goal-value.entity';
import { GoalValuesFactoryClass } from './factories/goal-factory.factory';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [TypeOrmModule.forFeature([GoalValuesEntity]), GoalValuesEntity,
  GoalsModule
  ],
  controllers: [GoalValuesController],
  providers: [GoalValuesService, GoalValuesFactoryClass],
})
export class GoalValuesModule { }
