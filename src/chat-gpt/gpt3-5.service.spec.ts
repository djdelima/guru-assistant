import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { Gpt3_5Service } from './gpt3-5.service';
import { ChatGPT } from './chat-gpt.interface';
import { mocked } from 'ts-jest/utils';

// Mock the axios module
jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('Gpt3_5Service', () => {
  let service: ChatGPT;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Gpt3_5Service],
    }).compile();

    service = module.get<ChatGPT>(Gpt3_5Service);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send messages to GPT-3.5 and return a response', async () => {
    const inputChunks = [
      'This is the first input chunk.',
      'This is the second input chunk.',
    ];

    // Mock the axios response
    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [
          {
            text: 'This is the response from GPT-3.5',
          },
        ],
      },
    });

    const response = await service.sendToGpt(inputChunks);
    expect(response).toEqual(['This is the response from GPT-3.5']);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('should handle errors thrown by axios.post', async () => {
    const inputChunks = [
      'This is the first input chunk.',
      'This is the second input chunk.',
    ];

    // Mock the axios response
    mockedAxios.post.mockRejectedValue(new Error('Error sending message'));

    await expect(service.sendToGpt(inputChunks)).rejects.toThrowError(
      'Error sending message',
    );
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
