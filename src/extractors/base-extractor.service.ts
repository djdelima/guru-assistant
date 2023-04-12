import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseExtractorService {
  protected extractMatches(
    content: string,
    regex: RegExp,
    results: string[],
  ): void {
    let match;
    while ((match = regex.exec(content)) !== null) {
      results.push(match[0]);
    }
  }
}
