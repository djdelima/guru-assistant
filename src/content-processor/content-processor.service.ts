import { Injectable } from '@nestjs/common';
import { TokenizerService } from './tokenizer/tokenizer.service';
import { ContentExtractionService } from '../extractors/content-extraction/content-extraction.service';
import { CodeAnnotatorService } from './code-annotator/code-annotator.service';
import { ProjectSummaryService } from './project-summarizer/projet-summary.service';

@Injectable()
export class ContentProcessorService {
  constructor(
    private readonly contentExtractionService: ContentExtractionService,
    private readonly tokenizerService: TokenizerService,
    private readonly codeAnnotatorService: CodeAnnotatorService,
    private readonly projectSummaryService: ProjectSummaryService,
  ) {}

  async processContent(contents: string[]): Promise<string[]> {
    const { codeBlocks, declarations, importsExports, readmeContent } =
      await this.contentExtractionService.extractMeaningfulContent(contents);

    const tokenizedCodes = this.tokenizerService.tokenizeCode(codeBlocks);

    const annotatedCode =
      this.codeAnnotatorService.annotateCode(tokenizedCodes);

    const projectSummary = this.projectSummaryService.createProjectSummary(
      contents,
      codeBlocks,
      declarations,
      importsExports,
      readmeContent,
    );

    const combinedInput = this.prepareInputForGpt(
      annotatedCode,
      projectSummary,
    );

    // Set the maxTokens based on your GPT-3.5 model's limit
    const maxTokens = 4096;
    const inputChunks = this.splitInputIntoChunks(combinedInput, maxTokens);

    return inputChunks;
  }

  private prepareInputForGpt(
    annotatedCode: string[],
    projectSummary: string,
  ): string {
    // Combine annotated code and project summary into a single input string for GPT-3.5
    const input = [
      'Project Summary:',
      projectSummary,
      '',
      'Annotated Code:',
      ...annotatedCode,
    ];

    return input.join('\n');
  }

  private splitInputIntoChunks(input: string, maxTokens: number): string[] {
    const chunks = [];
    let currentChunk = '';
    let currentTokenCount = 0;

    const lines = input.split('\n');
    for (const line of lines) {
      const lineTokenCount = line.length + 1; // +1 for the newline character
      if (currentTokenCount + lineTokenCount > maxTokens) {
        chunks.push(currentChunk);
        currentChunk = '';
        currentTokenCount = 0;
      }

      currentChunk += line + '\n';
      currentTokenCount += lineTokenCount;
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }
}
