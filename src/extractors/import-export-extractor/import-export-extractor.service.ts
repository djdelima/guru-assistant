import { Injectable } from '@nestjs/common';
import { BaseExtractorService } from '../base-extractor.service';
import { IExtractorService } from '../interface/extractor.service.interface';

@Injectable()
export class ImportExportExtractorService
  extends BaseExtractorService
  implements IExtractorService
{
  type: 'importExport' = 'importExport';

  private static readonly IMPORT_STATEMENT_REGEX = /import\s+[^;]+;/g;
  private static readonly EXPORT_STATEMENT_REGEX = /export\s+[^;]+;/g;

  extractImportExportStatements(content: string): string[] {
    const importExportStatements: string[] = [];

    this.extractMatches(
      content,
      ImportExportExtractorService.IMPORT_STATEMENT_REGEX,
      importExportStatements,
    );
    this.extractMatches(
      content,
      ImportExportExtractorService.EXPORT_STATEMENT_REGEX,
      importExportStatements,
    );

    return importExportStatements;
  }

  extract(content: string): string[] {
    return this.extractImportExportStatements(content);
  }
}
