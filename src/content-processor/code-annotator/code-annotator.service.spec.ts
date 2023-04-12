import { Test, TestingModule } from '@nestjs/testing';
import { CodeAnnotatorService } from './code-annotator.service';
import { TokenizedCode } from '../tokenizer/tokenizer.service';
import * as esprima from 'esprima';

describe('CodeAnnotatorService', () => {
  let service: CodeAnnotatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeAnnotatorService],
    }).compile();

    service = module.get<CodeAnnotatorService>(CodeAnnotatorService);
  });

  it('should return original code if tokenization failed', () => {
    const tokenizedCodeBlocks: TokenizedCode[] = [
      { codeBlock: 'const x = 10;', success: false, tokens: null },
    ];

    const annotatedCode = service.annotateCode(tokenizedCodeBlocks);

    expect(annotatedCode).toEqual(['const x = 10;']);
  });

  it('should handle tokenization failure', () => {
    const tokenizedCodeBlocks: TokenizedCode[] = [
      { codeBlock: 'const x = 10;', success: true, tokens: null },
      { codeBlock: 'function addNumbers()', success: false, tokens: null },
      {
        codeBlock: 'console.log("Hello, world!");',
        success: true,
        tokens: null,
      },
    ];

    const annotatedCode = service.annotateCode(tokenizedCodeBlocks);

    expect(annotatedCode.length).toEqual(tokenizedCodeBlocks.length);
    expect(annotatedCode[0]).toEqual('const x = 10;');
    expect(annotatedCode[1]).toEqual('function addNumbers()');
    expect(annotatedCode[2]).toEqual(
      'console.log(/* Punctuator */ "(") /* String */ "Hello, world!" /* Punctuator */ ")"',
    );
  });

  it('should annotate tokens with parameter types in function definitions', () => {
    // Define sample code block
    const sampleCodeBlock = `
    function addNumbers(x, y) {
      return x + y;
    }
  `;

    // Tokenize the sample code block
    const tokenizedCodeBlock: TokenizedCode = {
      codeBlock: sampleCodeBlock,
      tokens: esprima.tokenize(sampleCodeBlock),
      success: true,
    };

    // Annotate the tokenized code block
    const annotatedCodeBlock = service.annotateCode([tokenizedCodeBlock])[0];

    // Check that function tokens have been annotated with parameter types
    expect(annotatedCodeBlock).toContain(
      '/* Function addNumbers has parameters of types: unknown, unknown */ ',
    );
  });
});
