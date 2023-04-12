import { Module } from '@nestjs/common';
import { DirectoryReaderService } from './directory-reader.service';

@Module({
  providers: [DirectoryReaderService],
  exports: [DirectoryReaderService],
})
export class DirectoryReaderModule {}
