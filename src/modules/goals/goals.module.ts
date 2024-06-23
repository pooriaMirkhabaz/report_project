import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './entities/goal.entity';
import { IndicatorsModule } from '../indicators/indicators.module';
import { GoalFactoryClass } from './factories/goal.factory';
import goalsAdminTransformer from './transformer';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity]),
    IndicatorsModule,
  ],
  controllers: [GoalsController],
  providers: [GoalsService, goalsAdminTransformer, GoalFactoryClass],
  exports: [GoalsModule, GoalsService]
})
export class GoalsModule { }
