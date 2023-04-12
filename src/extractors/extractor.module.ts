import { Module } from '@nestjs/common';
import { CodeBlockExtractorService } from './code-block-extractor/code-block-extractor.service';
import { ContentExtractionService } from './content-extraction/content-extraction.service';
import { DeclarationExtractorService } from './declaration-extractor/declaration-extractor.service';
import { ImportExportExtractorService } from './import-export-extractor/import-export-extractor.service';

@Module({
  providers: [
    CodeBlockExtractorService,
    ContentExtractionService,
    DeclarationExtractorService,
    ImportExportExtractorService,
  ],
  exports: [
    CodeBlockExtractorService,
    ContentExtractionService,
    DeclarationExtractorService,
    ImportExportExtractorService,
  ],
})
export class ExtractorModule {}
