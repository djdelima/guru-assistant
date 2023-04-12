import { Injectable } from '@nestjs/common';
import { ChatGPT } from './chat-gpt.interface';
import axios from 'axios';

@Injectable()
export class Gpt3_5Service implements ChatGPT {
  private readonly apiEndpoint =
    'https://api.openai.com/v1/engines/davinci-codex/completions';
  private readonly apiKey = 'your-api-key'; // Replace with your actual API key

  async sendToGpt(inputChunks: string[]): Promise<string[]> {
    const data = {
      model: 'davinci-codex',
      documents: inputChunks,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    const response = await axios.post(this.apiEndpoint, data, config);
    return response.data.choices.map((choice) => choice.text.trim());
  }
}
