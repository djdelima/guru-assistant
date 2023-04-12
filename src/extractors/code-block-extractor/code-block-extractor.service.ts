import { Injectable } from '@nestjs/common';
import { Project } from 'ts-morph';
import { IExtractorService } from '../interface/extractor.service.interface';

@Injectable()
export class CodeBlockExtractorService implements IExtractorService {
  type: 'codeBlock' = 'codeBlock';
  extractCodeBlocks(content: string): string[] {
    const codeBlocks: string[] = [];

    const project = new Project();
    const sourceFile = project.createSourceFile(`file.ts`, content);

    const functions = sourceFile.getFunctions();
    const classes = sourceFile.getClasses();
    const interfaces = sourceFile.getInterfaces();
    const variables = sourceFile.getVariableDeclarations();

    const allBlocks = [...functions, ...classes, ...interfaces, ...variables];

    for (const block of allBlocks) {
      codeBlocks.push(block.getText());
    }

    return codeBlocks;
  }

  extract(content: string): string[] {
    return this.extractCodeBlocks(content);
  }
}
