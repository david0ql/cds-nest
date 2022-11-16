import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Idea } from './ideas/entities/idea.entity';
import { IdeasModule } from './ideas/ideas.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [IdeasModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    database: 'centro_software',
    entities: [Idea],
    synchronize: true,
  }),
  CommonModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
