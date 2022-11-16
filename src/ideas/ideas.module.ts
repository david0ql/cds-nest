import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';

@Module({
  controllers: [IdeasController],
  providers: [IdeasService],
  imports: [
    TypeOrmModule.forFeature([
      Idea
    ])
  ]
})
export class IdeasModule {}
