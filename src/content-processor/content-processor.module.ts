import { Module } from '@nestjs/common';
import { ContentProcessorService } from './content-processor.service';
import { CodeAnnotatorService } from './code-annotator/code-annotator.service';
import { ProjectSummaryService } from './project-summarizer/projet-summary.service';
import { TokenizerService } from './tokenizer/tokenizer.service';
import { ExtractorModule } from '../extractors/extractor.module';

@Module({
  imports: [ExtractorModule],
  providers: [
    ContentProcessorService,
    CodeAnnotatorService,
    ProjectSummaryService,
    TokenizerService,
  ],
  exports: [
    ContentProcessorService,
    CodeAnnotatorService,
    ProjectSummaryService,
    TokenizerService,
  ],
})
export class ContentProcessorModule {}
