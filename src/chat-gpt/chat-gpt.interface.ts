export interface ChatGPT {
  sendToGpt(inputChunks: string[]): Promise<string[]>;
}
