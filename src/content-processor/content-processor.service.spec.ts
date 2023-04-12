import { Test, TestingModule } from '@nestjs/testing';
import { ContentProcessorService } from './content-processor.service';
import { ContentExtractionService } from '../extractors/content-extraction/content-extraction.service';
import { TokenizerService } from './tokenizer/tokenizer.service';
import { CodeAnnotatorService } from './code-annotator/code-annotator.service';
import { ProjectSummaryService } from './project-summarizer/projet-summary.service';

describe('ContentProcessorService', () => {
  let service: ContentProcessorService;
  let contentExtractionService: ContentExtractionService;
  let tokenizerService: TokenizerService;
  let codeAnnotatorService: CodeAnnotatorService;
  let projectSummaryService: ProjectSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentProcessorService,
        ContentExtractionService,
        { provide: 'Array', useValue: [] }, // Add this line to provide the Array dependency
        TokenizerService,
        CodeAnnotatorService,
        ProjectSummaryService,
      ],
    }).compile();

    service = module.get<ContentProcessorService>(ContentProcessorService);
    contentExtractionService = module.get<ContentExtractionService>(
      ContentExtractionService,
    );
    tokenizerService = module.get<TokenizerService>(TokenizerService);
    codeAnnotatorService =
      module.get<CodeAnnotatorService>(CodeAnnotatorService);
    projectSummaryService = module.get<ProjectSummaryService>(
      ProjectSummaryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process content and return formatted messages', async () => {
    const contents = ['file1', 'file2', 'file3'];
    const extractedContent = {
      codeBlocks: ['codeBlock1', 'codeBlock2'],
      declarations: ['declaration1', 'declaration2'],
      importsExports: ['import1', 'export1'],
      readmeContent: 'readmeContent',
    };
    const tokenizedCode = [
      { success: true, codeBlock: 'codeBlock1', tokens: [] },
      { success: true, codeBlock: 'codeBlock2', tokens: [] },
    ];
    const annotatedCode = ['annotatedCode1', 'annotatedCode2'];
    const projectSummary = 'projectSummary';

    jest
      .spyOn(contentExtractionService, 'extractMeaningfulContent')
      .mockResolvedValue(extractedContent);
    jest.spyOn(tokenizerService, 'tokenizeCode').mockReturnValue(tokenizedCode);
    jest
      .spyOn(codeAnnotatorService, 'annotateCode')
      .mockReturnValue(annotatedCode);
    jest
      .spyOn(projectSummaryService, 'createProjectSummary')
      .mockReturnValue(projectSummary);

    const result = await service.processContent(contents);

    expect(result.length).toBe(3); // The number of chunks returned should match the input example
    expect(result.every((chunk) => chunk.role === 'user')).toBe(true);
  });

  // Add more test cases here
});
