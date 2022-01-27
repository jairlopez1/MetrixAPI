import { Body, HttpService, Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { MetricDto } from './dtos/metric.dto';
import { Config } from './entities/config.entity';
import { Metric } from './entities/metric.entity';

@Injectable()
export class MetrixService {
  constructor(private http: HttpService) {}

  /**
   * It returns the numeric value of a metric for a specific id.
   * If label or id don't exist, it returns undefined.
   * @param field
   * @param id
   * @returns { number | undefined }
   */
  async getAvailableFieldValue(field: number, id: string) {
    const connection = getConnection();
    const query = await connection
      .getRepository(Config)
      .findOne({ index: field });

    try {
      let queryResult;

      if (id) {
        queryResult = await connection.query(query.statement, [id]);
      } else {
        queryResult = await connection.query(query.statement);
      }

      return Number(queryResult[0].value);
    } catch {
      return undefined;
    }
  }

  /**
   * It stores the query to get the available metrics
   * and it returns the labels for these.
   * @returns { Array<string> }
   */
  async getAvailableFields() {
    const connection = getConnection();
    const availableFields = [];
    const fields = await connection.manager.find(Config, {
      select: ['index', 'label'],
    });
    for (const field of fields) {
      availableFields.push(`${field.index} - ${field.label}`);
    }

    return availableFields;
  }

  /**
   *
   * @param rule
   * @param id
   */
  async getOperationResult(rule: string, id: string) {
    //Get variables' numeric values
    const values = [];
    const ids = JSON.parse(id);
    for (const field in ids) {
      const fieldNumber = Number(field);
      const result = await this.getAvailableFieldValue(fieldNumber, ids[field]);
      values.push({ field: fieldNumber, value: result });
    }
    //Look for $ variables and replace with values
    const regex = new RegExp('[$][0-9]+', 'g');
    const found = rule.match(regex);
    let operation = rule;

    for (let index = 0; index < found.length; index++) {
      operation = operation.replace(
        found[index],
        values.find((value) => value.field === parseInt(found[index].slice(1)))
          .value,
      );
    }
    const result = eval(operation);
    return result;
  }

  async saveTemplate(@Body() metric: MetricDto) {
    const newTemplate = new Metric();
    newTemplate.rule = metric.rule;
    newTemplate.label = metric.label;
    newTemplate.formula = metric.formula;
    newTemplate.value = 0;
    const connection = getConnection();
    try {
      return await connection.manager.save(newTemplate);
    } catch (err) {
      return err;
    }
  }

  /**
   *
   */
  async getAvailableTemplates() {
    const connection = getConnection();
    const availableTemplates = [];
    const templates = await connection.manager.find(Metric, {
      select: ['label', 'formula'],
    });

    for (const template of templates) {
      availableTemplates.push(`${template.label} = ${template.formula}`);
    }

    return availableTemplates;
  }

  /**
   *
   * @param metric
   * @param id
   */
  async getOperationResultWithTemplate(metric: string, id: string) {
    const connection = getConnection();
    const template = await connection.manager.findOne(Metric, {
      label: metric,
    });

    return await this.getOperationResult(template.rule, id);
  }
}
