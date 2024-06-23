import { HttpStatus, Injectable } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { ReportsFactoryClass } from './factories/report.factory';
import { PublicMessage } from '../../common/enums/messages';
import { IndicatorEntity } from '../indicators/entities/indicator.entity';
import { IndicatorTypes } from '../indicators/enums/indicator.types.enum';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsFactoryClass: ReportsFactoryClass,
  ) {
  }

  public async getReports(query: ReportDto) {

    const departments = await this.reportsFactoryClass.findDepartmentsForReport(['indicators', 'indicators.values', 'indicators.goals']);
    const report = departments.map(department => {
      const departmentReport = {
        department: department.name,
        macroIndicators: [],
        intermediateIndicators: [],
        performanceIndicator: [],
      };

      department.indicators.map((indicator: IndicatorEntity) => {

        const indicatorValues = indicator.values.filter((value: any) => {
          return value.startDate >= query.start_date && value.endDate <= query.end_date;
        });

        const averageValue = indicatorValues.reduce((sum: number, value: any) => sum + value.value, 0) / indicatorValues.length;
        if (indicator.type === IndicatorTypes.Macro) {
          departmentReport.macroIndicators.push({ name: indicator.name, averageValue });
        } else if (indicator.type === IndicatorTypes.Performance) {
          departmentReport.performanceIndicator.push({ name: indicator.name, averageValue });
        } else if (indicator.type === IndicatorTypes.Intermediate) {
          departmentReport.intermediateIndicators.push({ name: indicator.name, averageValue });
        }
      });

      return departmentReport;
    });


    return {
      statusCode: HttpStatus.OK,
      message: PublicMessage.OkResponse,
      data: report,
    };
  }
}
