import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea } from './entities/idea.entity';

@Injectable()
export class IdeasService {
  private readonly logger = new Logger('IdeasService');
  constructor(
    @InjectRepository(Idea)
    private ideaRepository: Repository<Idea>,
  ) {}

  async create(createIdeaDto: CreateIdeaDto) {
    try {
      const idea = this.ideaRepository.create(createIdeaDto);
      await this.ideaRepository.save(idea);
      return idea;
    } catch (error) {
      this.handleDBErros(error);
    }
  }

  async findAll( paginationDto : PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;

    const ideas = await this.ideaRepository.find({
      take: limit,
      skip: offset,
    });
    return { ideas };
  }

  async findOne(id: number) {
    const idea = await this.ideaRepository.findOneBy({
      id_idea: id,
    });

    if (!idea)
      throw new NotFoundException(`Idea con el id ${id} no encontrado`);

    return { idea };
  }

  async update(id: number, updateIdeaDto: UpdateIdeaDto) {
    await this.findOne(id);

    const idea = await this.ideaRepository.preload({
      id_idea: id,
      ...updateIdeaDto,
    });

    try {
      await this.ideaRepository.save(idea);
    } catch (error) {
      this.handleDBErros(error);
    }
  }

  async remove(id: number) {
    const idea = await this.findOne(id);
    await this.ideaRepository.delete({ id_idea: id });
    return { idea };
  }

  handleDBErros(error: any) {
    if (error.errno === 1062) throw new BadRequestException(error.sqlMessage);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
