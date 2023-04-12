import { Injectable } from '@nestjs/common';
import { IExtractorService } from '../interface/extractor.service.interface';
import { BaseExtractorService } from '../base-extractor.service';

@Injectable()
export class DeclarationExtractorService
  extends BaseExtractorService
  implements IExtractorService
{
  type: 'declaration' = 'declaration';

  private static readonly FUNCTION_DECLARATION_REGEX =
    /(async\s+)?function\s+\w+\s*\([^)]*\)/g;
  private static readonly CLASS_DECLARATION_REGEX = /class\s+\w+/g;
  private static readonly INTERFACE_DECLARATION_REGEX = /interface\s+\w+/g;
  private static readonly VARIABLE_DECLARATION_REGEX = /(let|const|var)\s+\w+/g;

  extractDeclarations(content: string): string[] {
    const declarations: string[] = [];

    this.extractMatches(
      content,
      DeclarationExtractorService.FUNCTION_DECLARATION_REGEX,
      declarations,
    );
    this.extractMatches(
      content,
      DeclarationExtractorService.CLASS_DECLARATION_REGEX,
      declarations,
    );

    this.extractMatches(
      content,
      DeclarationExtractorService.INTERFACE_DECLARATION_REGEX,
      declarations,
    );
    this.extractMatches(
      content,
      DeclarationExtractorService.VARIABLE_DECLARATION_REGEX,
      declarations,
    );

    return declarations;
  }

  extract(content: string): string[] {
    return this.extractDeclarations(content);
  }
}
