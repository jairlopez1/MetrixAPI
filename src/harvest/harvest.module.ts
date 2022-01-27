import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { BudgetReport } from './entities/budgetReport.entity';
import { Client } from './entities/client.entity';
import { TimeEntry } from './entities/timeEntry.entity';
import { User } from './entities/user.entity';
import { UserAssignment } from './entities/userAssignment.entity';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      Project,
      BudgetReport,
      Client,
      TimeEntry,
      User,
      UserAssignment,
    ]),
  ],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
