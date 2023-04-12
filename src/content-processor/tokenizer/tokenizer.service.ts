import { Injectable } from '@nestjs/common';
import * as esprima from 'esprima';

@Injectable()
export class TokenizerService {
  tokenizeCode(codeBlocks: string[]): TokenizedCode[] {
    return codeBlocks.map((codeBlock) =>
      this.tokenizeSingleCodeBlock(codeBlock),
    );
  }

  private tokenizeSingleCodeBlock(codeBlock: string): TokenizedCode {
    try {
      const tokens = esprima.tokenize(codeBlock);
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
  tokens?: esprima.Token[];
  error?: string;
}
