import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { FileFilterService } from '../file-filter/file-filter.service';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

@Injectable()
export class DirectoryReaderService {
  private fileFilterService: FileFilterService;

  constructor() {
    this.fileFilterService = new FileFilterService(
      ['.js', '.ts', '.jsx', '.tsx', '.md', '.txt', '.html'],
      ['node_modules', '.git', '.idea'],
    );
  }

  async readProjectDirectory(dirPath: string): Promise<string[]> {
    const filePaths = await this.getFilePaths(dirPath);
    const filteredFiles = this.fileFilterService.filterFiles(filePaths);
    return await this.readFileContents(filteredFiles);
  }

  private async getFilePaths(
    dirPath: string,
    filePaths: string[] = [],
  ): Promise<string[]> {
    const files = await readdir(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await this.getFilePaths(fullPath, filePaths);
      } else {
        filePaths.push(fullPath);
      }
    }

    return filePaths;
  }

  private async readFileContents(filePaths: string[]): Promise<string[]> {
    const fileContents: string[] = [];

    for (const filePath of filePaths) {
      const content = await readFile(filePath, 'utf-8');
      fileContents.push(content);
    }

    return fileContents;
  }
}
