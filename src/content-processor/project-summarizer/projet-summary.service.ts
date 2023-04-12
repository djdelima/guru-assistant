import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectSummaryService {
  private calculateStatistics(
    contents: string[],
    codeBlocks: string[],
    declarations: string[],
    importsExports: string[],
  ): any {
    const totalFiles = contents.length;
    const totalLinesOfCode = contents.reduce(
      (total, content) => total + content.split('\n').length,
      0,
    );

    const fileTypeBreakdown = this.calculateFileTypeBreakdown(contents);
    const codeElementDistribution = this.calculateCodeElementDistribution(
      codeBlocks,
      declarations,
      importsExports,
    );

    const uniqueDependencies = this.calculateUniqueDependencies(importsExports);

    return {
      totalFiles,
      totalLinesOfCode,
      fileTypeBreakdown,
      codeElementDistribution,
      uniqueDependencies,
    };
  }

  private calculateFileTypeBreakdown(contents: string[]): any {
    const fileTypeCount = {
      JavaScript: 0,
      TypeScript: 0,
      Other: 0,
    };

    for (const content of contents) {
      // Identify the file type from the file path based on file extensions
      if (content.endsWith('.js')) {
        fileTypeCount.JavaScript++;
      } else if (content.endsWith('.ts')) {
        fileTypeCount.TypeScript++;
      } else {
        fileTypeCount.Other++;
      }
    }

    return fileTypeCount;
  }

  private calculateCodeElementDistribution(
    codeBlocks: string[],
    declarations: string[],
    importsExports: string[],
  ): any {
    const functionCount = codeBlocks.filter(
      (block) =>
        block.startsWith('function') || block.startsWith('async function'),
    ).length;
    const classCount = codeBlocks.filter((block) =>
      block.startsWith('class'),
    ).length;
    const interfaceCount = declarations.filter((declaration) =>
      declaration.startsWith('interface'),
    ).length;
    const variableCount = declarations.filter(
      (declaration) =>
        declaration.startsWith('let') ||
        declaration.startsWith('const') ||
        declaration.startsWith('var'),
    ).length;
    const importCount = importsExports.filter((statement) =>
      statement.startsWith('import'),
    ).length;
    const exportCount = importsExports.filter((statement) =>
      statement.startsWith('export'),
    ).length;

    return {
      functionCount,
      classCount,
      interfaceCount,
      variableCount,
      importCount,
      exportCount,
    };
  }

  private calculateUniqueDependencies(importsExports: string[]): any {
    const dependencies = new Set<string>();
    const dependencyRegex = /import.+from\s+['"]([^'"]+)['"]/;

    for (const statement of importsExports) {
      if (statement.startsWith('import')) {
        // Extract the dependency name from the import statement using regex
        const match = statement.match(dependencyRegex);
        if (match && match[1]) {
          dependencies.add(match[1]);
        }
      }
    }

    return Array.from(dependencies);
  }

  // private identifyIssues(
  //   contents: string[],
  //   codeBlocks: string[],
  //   declarations: string[],
  //   importsExports: string[],
  // ): any {
  //   // Identify potential issues based on the provided data.
  // }

  createProjectSummary(
    contents: string[],
    codeBlocks: string[],
    declarations: string[],
    importsExports: string[],
    readmeContent: string,
  ): string {
    const statistics = this.calculateStatistics(
      contents,
      codeBlocks,
      declarations,
      importsExports,
    );

    const summary = [
      `Project Summary:`,
      `Total Files: ${statistics.totalFiles}`,
      `Total Lines of Code: ${statistics.totalLinesOfCode}`,
      ``,
      `File Type Breakdown:`,
      `JavaScript Files: ${statistics.fileTypeBreakdown.JavaScript}`,
      `TypeScript Files: ${statistics.fileTypeBreakdown.TypeScript}`,
      `Other Files: ${statistics.fileTypeBreakdown.Other}`,
      ``,
      `Code Element Distribution:`,
      `Functions: ${statistics.codeElementDistribution.functionCount}`,
      `Classes: ${statistics.codeElementDistribution.classCount}`,
      `Interfaces: ${statistics.codeElementDistribution.interfaceCount}`,
      `Variables: ${statistics.codeElementDistribution.variableCount}`,
      `Imports: ${statistics.codeElementDistribution.importCount}`,
      `Exports: ${statistics.codeElementDistribution.exportCount}`,
      ``,
      `Unique Dependencies:`,
      ...statistics.uniqueDependencies.map((dep) => `  - ${dep}`),
      'README Content:',
      readmeContent,
    ];

    return summary.join('\n');
  }
}
