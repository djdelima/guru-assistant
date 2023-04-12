import { Test, TestingModule } from '@nestjs/testing';
import { ContentProcessorService } from './content-processor.service';
import { TokenizerService } from './tokenizer/tokenizer.service';
import { CodeAnnotatorService } from './code-annotator/code-annotator.service';
import { ProjectSummaryService } from './project-summarizer/projet-summary.service';
import { ExtractorModule } from '../extractors/extractor.module';

describe('ContentProcessorService (integration)', () => {
  let service: ContentProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExtractorModule],
      providers: [
        ContentProcessorService,
        TokenizerService,
        CodeAnnotatorService,
        ProjectSummaryService,
      ],
    }).compile();

    service = module.get<ContentProcessorService>(ContentProcessorService);
  });

  it('should process content correctly', async () => {
    const contents = [
      // Controller file content
      `
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleEntity } from './sample.entity';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  async findAll(): Promise<SampleEntity[]> {
    return this.sampleService.findAll();
  }

  @Post()
  async create(@Body() sampleEntity: SampleEntity): Promise<SampleEntity> {
    return this.sampleService.create(sampleEntity);
  }
}
`,
      // Service file content
      `
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SampleEntity } from './sample.entity';

@Injectable()
export class SampleService {
  constructor(private readonly sampleRepository: Repository<SampleEntity>) {}

  async findAll(): Promise<SampleEntity[]> {
    return this.sampleRepository.find();
  }

  async create(sampleEntity: SampleEntity): Promise<SampleEntity> {
    return this.sampleRepository.save(sampleEntity);
  }
}
`,
      // Entity file content
      `
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
`,
    ];

    const result = await service.processContent(contents);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    result.forEach((message) => {
      expect(message.role).toBe('user');
      expect(message.content).toBeDefined();
    });
  });
});
