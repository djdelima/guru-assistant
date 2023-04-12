import { Injectable } from '@nestjs/common';
import { parse } from '@typescript-eslint/parser';

@Injectable()
export class TokenizerService {
  tokenizeCode(codeBlocks: string[]): TokenizedCode[] {
    return codeBlocks.map((codeBlock) =>
      this.tokenizeSingleCodeBlock(codeBlock),
    );
  }

  private tokenizeSingleCodeBlock(codeBlock: string): TokenizedCode {
    try {
      const ast = parse(codeBlock, {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      });
      const tokens = ast.tokens;
      return {
        success: true,
        codeBlock,
        tokens,
      };
    } catch (error) {
      return {
        success: false,
        codeBlock,
        error: error.message,
      };
    }
  }
}

export interface TokenizedCode {
  success: boolean;
  codeBlock: string;
  tokens?: any[]; // Change the type to any[] as the token format is different than esprima.Token
  error?: string;
}
