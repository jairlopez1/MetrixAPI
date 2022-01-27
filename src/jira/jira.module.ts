import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Sprint } from './entities/sprint.entity';
import { Issue } from './entities/issue.entity';
import { JiraController } from './jira.controller';
import { JiraService } from './jira.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Board, Sprint, Issue])],
  controllers: [JiraController],
  providers: [JiraService],
})
export class JiraModule {}
