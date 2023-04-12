import { Test, TestingModule } from '@nestjs/testing';
import { CodeBlockExtractorService } from './code-block-extractor.service';

describe('CodeBlockExtractorService', () => {
  let service: CodeBlockExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeBlockExtractorService],
    }).compile();

    service = module.get<CodeBlockExtractorService>(CodeBlockExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test case 1: Empty input
  it('should return an empty array for an empty input', () => {
    const contents: string[] = [''];
    const result = service.extractCodeBlocks(contents);
    expect(result).toEqual([]);
  });

  // Test case 2: Single code block
  it('should return an array with a single code block for an input with one code block', () => {
    const contents: string[] = [
      `function greet(name: string) {
      console.log('Hello, ' + name + '!');
    }`,
    ];
    const result = service.extractCodeBlocks(contents);
    expect(result).toEqual([
      "function greet(name: string) {\n      console.log('Hello, ' + name + '!');\n    }",
    ]);
  });

  // Test case 3: Multiple code blocks
  it('should return an array with multiple code blocks for an input with multiple code blocks', () => {
    const contents: string[] = [
      `class Person {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
    }

    function greet(person: Person) {
      console.log('Hello, ' + person.name + '!');
    }`,
    ];
    const result = service.extractCodeBlocks(contents).sort();
    const expectedResult = [
      `class Person {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
    }`,
      `function greet(person: Person) {
      console.log('Hello, ' + person.name + '!');
    }`,
    ].sort();
    expect(result).toEqual(expectedResult);
  });
});
