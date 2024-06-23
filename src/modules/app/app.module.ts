import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from '../departments/departments.module';
import { IndicatorsModule } from '../indicators/indicators.module';
import { GoalsModule } from '../goals/goals.module';
import { GoalValuesModule } from '../goal-values/goal-values.module';
import { IndicatorValuesModule } from '../indicator-values/indicator-values.module';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      inject: [TypeOrmConfig],
    }),
    DepartmentsModule,
    IndicatorsModule,
    IndicatorValuesModule,
    GoalsModule,
    GoalValuesModule,
    ReportsModule,
  ],
  providers: [],
})
export class AppModule {
}
