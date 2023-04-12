import { Injectable } from '@nestjs/common';
import { IExtractorService } from '../interface/extractor.service.interface';
import { CodeBlockExtractorService } from '../code-block-extractor/code-block-extractor.service';
import { DeclarationExtractorService } from '../declaration-extractor/declaration-extractor.service';
import { ImportExportExtractorService } from '../import-export-extractor/import-export-extractor.service';

@Injectable()
export class ContentExtractionService {
  constructor(private readonly extractors: IExtractorService[]) {}

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
      for (const extractor of this.extractors) {
        const extractedContent = extractor.extract(content);
        if (extractor instanceof CodeBlockExtractorService) {
          codeBlocks.push(...extractedContent);
        } else if (extractor instanceof DeclarationExtractorService) {
          declarations.push(...extractedContent);
        } else if (extractor instanceof ImportExportExtractorService) {
          importsExports.push(...extractedContent);
        }
      }
      readmeContent = this.extractReadmeContent(contents);
    }

    return { codeBlocks, declarations, importsExports, readmeContent };
  }

  private extractReadmeContent(fileContents: string[]): string {
    const readmeFile = fileContents.find((content) => content.startsWith('# '));

    if (readmeFile) {
      const linesWithContent = readmeFile
        .split('\n')
        .filter((line) => line.trim() !== '');
      const first50Lines = linesWithContent.slice(0, 50).join('\n');
      return first50Lines;
    }

    return '';
  }
}
