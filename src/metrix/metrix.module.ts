import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';
import { Metric } from './entities/metric.entity';
import { Report } from './entities/report.entity';
import { MetrixController } from './metrix.controller';
import { MetrixService } from './metrix.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Config, Report, Metric])],
  controllers: [MetrixController],
  providers: [MetrixService],
})
export class MetrixModule {}
