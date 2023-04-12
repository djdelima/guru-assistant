import { Module } from '@nestjs/common';
import { DirectoryReaderService } from './directory-reader.service';

@Module({
  providers: [DirectoryReaderService]
})
export class DirectoryReaderModule {}
