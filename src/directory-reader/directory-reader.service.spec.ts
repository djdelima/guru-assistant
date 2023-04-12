import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReaderService } from './directory-reader.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('DirectoryReaderService', () => {
  let service: DirectoryReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectoryReaderService],
    }).compile();

    service = module.get<DirectoryReaderService>(DirectoryReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read project directory and return file contents', async () => {
    const testDir = path.join(__dirname, 'test-data');
    const fileContents = await service.readProjectDirectory(testDir);

    // Ensure the file contents are read and returned in the correct order
    expect(fileContents.length).toEqual(3);
    expect(fileContents[0]).toContain('This is file1.txt');
    expect(fileContents[1]).toContain('This is file2.txt');
    expect(fileContents[2]).toContain('This is file3.txt');
  });

  it('should return an empty array if no files are found', async () => {
    const testDir = path.join(__dirname, '/test-data/empty-dir');
    const fileContents = await service.readProjectDirectory(testDir);

    // Ensure that an empty array is returned
    expect(fileContents.length).toEqual(0);
  });

  it('should filter out irrelevant files and excluded directories', async () => {
    const testDir = path.join(__dirname, 'test-data');
    const irrelevantFile = path.join(testDir, 'irrelevant-file.pdf');
    const excludedDirectory = path.join(
      testDir,
      'node_modules',
      'some-library',
    );
    const irrelevantDirectory = path.join(testDir, 'irrelevant-directory');
    const irrelevantFilePaths = [
      irrelevantFile,
      excludedDirectory,
      irrelevantDirectory,
    ];
    for (const filePath of irrelevantFilePaths) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, 'Some file contents');
    }
    const fileContents = await service.readProjectDirectory(testDir);

    // Ensure that the irrelevant files and excluded directories are filtered out
    expect(fileContents.length).toEqual(3);
    expect(fileContents[0]).toContain('This is file1.txt');
    expect(fileContents[1]).toContain('This is file2.txt');
    expect(fileContents[2]).toContain('This is file3.txt');

    // Cleanup test files
    for (const filePath of irrelevantFilePaths) {
      fs.unlinkSync(filePath);
    }
  });
});
