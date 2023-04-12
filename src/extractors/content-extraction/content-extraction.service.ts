import { Injectable } from '@nestjs/common';
import { CodeBlockExtractorService } from '../code-block-extractor/code-block-extractor.service';
import { DeclarationExtractorService } from '../declaration-extractor/declaration-extractor.service';
import { ImportExportExtractorService } from '../import-export-extractor/import-export-extractor.service';

@Injectable()
export class ContentExtractionService {
  constructor(
    private readonly codeBlockExtractorService: CodeBlockExtractorService,
    private readonly declarationExtractorService: DeclarationExtractorService,
    private readonly importExportExtractorService: ImportExportExtractorService,
  ) {}

  async extractMeaningfulContent(contents: string[]): Promise<{
    codeBlocks: string[];
    declarations: string[];
    importsExports: string[];
    readmeContent: string;
  }> {
    const codeBlocks: string[] = [];
    const declarations: string[] = [];
    const importsExports: string[] = [];
    let readmeContent: string;

    for (const content of contents) {
      const codeBlockContent = this.codeBlockExtractorService.extract(content);
      codeBlocks.push(...codeBlockContent);

      const declarationContent =
        this.declarationExtractorService.extract(content);
      declarations.push(...declarationContent);

      const importExportContent =
        this.importExportExtractorService.extract(content);
      importsExports.push(...importExportContent);

      readmeContent = this.extractReadmeContent(content);
    }

    return { codeBlocks, declarations, importsExports, readmeContent };
  }

  private extractReadmeContent(content: string): string {
    if (content.startsWith('# ')) {
      const linesWithContent = content
        .split('\n')
        .filter((line) => line.trim() !== '');
      const first50Lines = linesWithContent.slice(0, 50).join('\n');
      return first50Lines;
    }

    return '';
  }
}
