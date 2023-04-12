import { Injectable } from '@nestjs/common';
import { DirectoryReaderService } from './directory-reader/directory-reader.service';
import { Gpt3_5Service } from './chat-gpt/gpt3-5.service';
import { ContentProcessorService } from './content-processor/content-processor.service';

@Injectable()
export class AppService {
  constructor(
    private readonly directoryReaderService: DirectoryReaderService,
    private readonly contentProcessorService: ContentProcessorService,
    private readonly gpt35Service: Gpt3_5Service,
  ) {}

  async scanProject(folderPath: string, question?: string): Promise<void> {
    const fileContents = await this.directoryReaderService.readProjectDirectory(
      folderPath,
    );
    const messages = await this.contentProcessorService.processContent(
      fileContents,
    );

    if (question) {
      // Send input chunks to GPT-3.5 and receive a response
      const response = await this.gpt35Service.sendToGpt([
        ...messages,
        { role: 'user', content: question },
      ]);
      console.log('GPT-3.5 Response:', response);
    } else {
      // Only scan the project with GPT-4
      await this.gpt35Service.sendToGpt(messages);
    }
  }

  async askQuestion(question: string): Promise<void> {
    // Send input chunks to GPT-3.5 and receive a response
    const response = await this.gpt35Service.sendToGpt([
      {
        role: 'user',
        content: question,
      },
    ]);
    console.log('GPT-3.5 Response:', response);
  }
}
