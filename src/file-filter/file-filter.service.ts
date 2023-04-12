import * as path from 'path';

export class FileFilterService {
  private readonly relevantExtensions: string[];
  private readonly excludedDirectories: string[];

  constructor(relevantExtensions: string[], excludedDirectories: string[]) {
    this.relevantExtensions = relevantExtensions;
    this.excludedDirectories = excludedDirectories;
  }

  public filterFiles(files: string[]): string[] {
    const filteredFiles = files.filter((file) => {
      const extension = path.extname(file);
      const isRelevantExtension = this.relevantExtensions.includes(extension);
      const isExcludedDirectory = this.excludedDirectories.some((dir) =>
        file.includes(`${path.sep}${dir}${path.sep}`),
      );

      return isRelevantExtension && !isExcludedDirectory;
    });

    return filteredFiles;
  }
}
