import { Test, TestingModule } from '@nestjs/testing';
import { ContentProcessorService } from './content-processor.service';

describe('ContentProcessorService', () => {
  let service: ContentProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentProcessorService],
    }).compile();

    service = module.get<ContentProcessorService>(ContentProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
