import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DirectoryReaderModule } from './directory-reader/directory-reader.module';
import { ContentProcessorModule } from './content-processor/content-processor.module';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { ContentExtractionModule } from './extractors/content-extraction/content-extraction.module';
import { CodeBlockExtractorModule } from './extractors/code-block-extractor/code-block-extractor.module';
import { DeclarationExtractorModule } from './extractors/declaration-extractor/declaration-extractor.module';
import { ExtractorModule } from './extractors/extractor.module';

@Module({
  imports: [DirectoryReaderModule, ContentProcessorModule, ChatGptModule, ContentExtractionModule, CodeBlockExtractorModule, DeclarationExtractorModule, ExtractorModule],
  providers: [AppService],
})
export class AppModule {}
