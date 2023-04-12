import { Module } from '@nestjs/common';
import { ContentProcessorService } from './content-processor.service';

@Module({
  providers: [ContentProcessorService]
})
export class ContentProcessorModule {}