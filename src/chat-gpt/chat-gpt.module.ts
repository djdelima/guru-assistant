import { Module } from '@nestjs/common';
import { Gpt3_5Service } from './gpt3-5.service';

@Module({
  providers: [Gpt3_5Service],
  exports: [Gpt3_5Service],
})
export class ChatGptModule {}
