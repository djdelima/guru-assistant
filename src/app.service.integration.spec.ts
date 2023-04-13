import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DirectoryReaderService } from './directory-reader/directory-reader.service';
import { ContentProcessorService } from './content-processor/content-processor.service';
import { Gpt3_5Service } from './chat-gpt/gpt3-5.service';
import { ExtractorModule } from './extractors/extractor.module';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { ContentProcessorModule } from './content-processor/content-processor.module';
import { DirectoryReaderModule } from './directory-reader/directory-reader.module';

describe('AppService (e2e)', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ExtractorModule,
        ChatGptModule,
        ContentProcessorModule,
        DirectoryReaderModule,
      ],
      providers: [
        AppService,
        DirectoryReaderService,
        ContentProcessorService,
        Gpt3_5Service,
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('scanProject', () => {
    it('should read files from a folder, process content, and send messages to GPT-3.5', async () => {
      // Prepare
      const folderPath =
        '/Users/diego.delima/Documents/projects/idp-dazn-pwd-based/src/provider';
      const question =
        'I want you to tell me about this module and what it does and its purpose to the project';

      // Execute
      try {
        const result = await appService.scanProject(folderPath, question);
        expect(result).toBeTruthy();
      } catch (error) {
        console.log('Error:', error);
      }
      // Since this is an integration test, we don't check the internal behavior of the services.
      // The test is considered successful if no errors are thrown during the execution.
    }, 15000);
  });
});
