import { Injectable } from '@nestjs/common';
import { TokenizedCode } from '../tokenizer/tokenizer.service';
import * as esprima from 'esprima';

@Injectable()
export class CodeAnnotatorService {
  annotateCode(tokenizedCodeBlocks: TokenizedCode[]): string[] {
    // Process the tokenized code to add annotations, such as comments or context information.
    // You can iterate through each code block's tokens, analyze them, and add annotations as needed.

    const annotatedCode: string[] = tokenizedCodeBlocks.map(
      (tokenizedCodeBlock) => {
        // Check if tokenization was successful
        if (!tokenizedCodeBlock.success || !tokenizedCodeBlock.tokens) {
          return tokenizedCodeBlock.codeBlock; // Return the original code block if tokenization failed
        }

        let codeBlockAnnotations = '';

        // Iterate through the tokens of a code block.
        tokenizedCodeBlock.tokens.forEach((token) => {
          // Analyze the token and add annotations as needed.
          // Example: adding a comment with the token type
          codeBlockAnnotations += `${token.value} /* ${token.type} */ `;
        });

        return codeBlockAnnotations;
      },
    );

    return annotatedCode;
  }
}

// Annotate a function token with its parameter types
function annotateFunctionToken(
  token: esprima.Token,
  tokens: esprima.Token[],
): string {
  const functionIndex = tokens.indexOf(token);
  const openingParenIndex = tokens.findIndex(
    (t, index) =>
      t.type === 'Punctuator' && t.value === '(' && index > functionIndex,
  );
  const closingParenIndex = tokens.findIndex(
    (t, index) =>
      t.type === 'Punctuator' && t.value === ')' && index > openingParenIndex,
  );

  const parameters = tokens
    .slice(openingParenIndex + 1, closingParenIndex)
    .filter((t) => t.type === 'Identifier');

  const parameterTypes = parameters.map((param) => 'unknown').join(', ');

  return `/* Function ${token.value} has parameters of types: ${parameterTypes} */ `;
}
