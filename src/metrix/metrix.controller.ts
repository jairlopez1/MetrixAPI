import { Body } from '@nestjs/common';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { MetricDto } from './dtos/metric.dto';
import { MetrixService } from './metrix.service';

@Controller('metrix')
export class MetrixController {
  constructor(private readonly metrixService: MetrixService) {}

  @Get('available-fields')
  getAvailableFields() {
    return this.metrixService.getAvailableFields();
  }

  @Get('fields')
  getAvailableFieldValue(
    @Query('field') field: number,
    @Query('id') id: string,
  ) {
    return this.metrixService.getAvailableFieldValue(field, id);
  }

  @Get('operation')
  getOperationResult(@Query('rule') rule: string, @Query('id') id: string) {
    return this.metrixService.getOperationResult(rule, id);
  }

  @Get('available-templates')
  getAvailableTemplates() {
    return this.metrixService.getAvailableTemplates();
  }

  @Get('templates')
  getOperationResultWithTemplate(
    @Query('metric') metric: string,
    @Query('id') id: string,
  ) {
    return this.metrixService.getOperationResultWithTemplate(metric, id);
  }

  @Post('templates')
  saveTemplate(@Body() metric: MetricDto) {
    return this.metrixService.saveTemplate(metric);
  }
}
