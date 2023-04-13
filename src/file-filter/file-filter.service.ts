import { Injectable } from '@nestjs/common';

@Injectable()
export class FileFilterService {
  constructor(
    private readonly allowedExtensions: string[],
    private readonly excludedFolders: string[],
    private readonly excludedExtensions: string[] = [],
  ) {}

  filterFiles(filePaths: string[]): string[] {
    return filePaths.filter((filePath) => {
      const fileExtension = this.getFileExtension(filePath);
      const folderName = this.getFolderName(filePath);

      // Ignore files with excluded extensions
      if (this.excludedExtensions.includes(fileExtension)) {
        return false;
      }

      return (
        this.allowedExtensions.includes(fileExtension) &&
        !this.excludedFolders.includes(folderName)
      );
    });
  }

  private getFileExtension(filePath: string): string {
    return filePath.slice(filePath.lastIndexOf('.'));
  }

  private getFolderName(filePath: string): string {
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 2];
  }
}
