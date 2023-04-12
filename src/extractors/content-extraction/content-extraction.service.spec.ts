import { Test, TestingModule } from '@nestjs/testing';
import { ContentExtractionService } from './content-extraction.service';

describe('ContentExtractionService', () => {
  let service: ContentExtractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentExtractionService],
    }).compile();

    service = module.get<ContentExtractionService>(ContentExtractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
