import { Module } from '@nestjs/common';
import { JiraModule } from './jira/jira.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestModule } from './harvest/harvest.module';
import { MetrixModule } from './metrix/metrix.module';

@Module({
  imports: [
    JiraModule,
    HarvestModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || ''),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DATABASE_URL ? true : false,
      /* ssl: {
        rejectUnauthorized: false,
      },*/
    }),
    MetrixModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
