import { Injectable } from '@nestjs/common';
import { ChatGPT } from './chat-gpt.interface';
import axios from 'axios';

@Injectable()
export class Gpt3_5Service {
  private readonly apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = 'your-key'; // Replace with your actual API key

  async sendToGpt(
    messages: { role: string; content: string }[],
  ): Promise<string> {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500, // Adjust this value based on the desired response length
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    try {
      const response = await axios.post(this.apiEndpoint, data, config);
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.log(error);
    }

    const response = await axios.post(this.apiEndpoint, data, config);
    return response.data.choices[0].message.content.trim();
  }
}
