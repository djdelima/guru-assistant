import { FileFilterService } from './file-filter.service';

describe('FileFilterService', () => {
  let fileFilterService: FileFilterService;

  beforeEach(() => {
    fileFilterService = new FileFilterService(
      ['.js', '.ts', '.jsx', '.tsx', '.md', '.txt', '.html', '.css', '.scss'],
      ['node_modules', '.git'],
    );
  });

  it('should filter out irrelevant files and excluded directories', () => {
    const files = [
      'src/main.ts',
      'src/app.module.ts',
      'src/node_modules/some-library/index.js',
      'src/.git/HEAD',
      'src/assets/logo.png',
    ];
    const filteredFiles = fileFilterService.filterFiles(files);

    expect(filteredFiles).toEqual(['src/main.ts', 'src/app.module.ts']);
  });

  it('should return an empty array if no relevant files are found', () => {
    const files = [
      'src/assets/logo.png',
      'src/node_modules/some-library/index.js',
      'src/.git/HEAD',
    ];
    const filteredFiles = fileFilterService.filterFiles(files);

    expect(filteredFiles).toEqual([]);
  });

  it('should return all relevant files if no excluded directories or their subdirectories are present', () => {
    const files = ['src/main.ts', 'src/app.module.ts', 'src/app.controller.ts'];
    const filteredFiles = fileFilterService.filterFiles(files);

    expect(filteredFiles).toEqual(files);
  });
});
