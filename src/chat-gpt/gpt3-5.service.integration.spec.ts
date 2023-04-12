import { Test, TestingModule } from '@nestjs/testing';
import { Gpt3_5Service } from './gpt3-5.service';

describe('Gpt3_5Service', () => {
  let service: Gpt3_5Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Gpt3_5Service],
    }).compile();

    service = module.get<Gpt3_5Service>(Gpt3_5Service);
  });

  it('should send input to GPT-3.5 and return a response', async () => {
    const input = [
      {
        role: 'user',
        content: `
Project Summary:
Total Files: 10
Total Lines of Code: 250
File Type Breakdown:
  JavaScript Files: 6
  TypeScript Files: 3
  Other Files: 1
Code Element Distribution:
  Functions: 15
  Classes: 4
  Interfaces: 2
  Variables: 22
  Imports: 14
  Exports: 10
Unique Dependencies:
  - lodash
  - express
README Content:
This is a simple project that serves as an API for managing tasks.
Annotated Code:
// Function to create a new task
function createTask(task) {
  // Validate task input
  if (!task.title || !task.description) {
    throw new Error('Invalid task input');
  }

  // Save task to database
  // ...
}
`,
      },
    ];

    const response = await service.sendToGpt(input);

    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  }, 10000);

  it('should send input in multiple chuncks (message) to GPT-3.5 and return a response talking about the two chuncks', async () => {
    const input = [
      {
        role: 'user',
        content: `
Project Summary:
Total Files: 12
Total Lines of Code: 280
File Type Breakdown:
  JavaScript Files: 7
  TypeScript Files: 4
  Other Files: 1
Code Element Distribution:
  Functions: 18
  Classes: 4
  Interfaces: 3
  Variables: 25
  Imports: 16
  Exports: 11
Unique Dependencies:
  - lodash
  - express
  - axios
README Content:
This is a simple project that serves as an API for managing tasks and users.
Annotated Code:
// Class A
class A {
  // Method to add two numbers
  add(a, b) {
    return a + b;
  }
}
`,
      },
      {
        role: 'user',
        content: `
// Class B
class B {
  // Method to return a greeting
  greet(name) {
    return \`Hello, \${name}!\`;
  }
}

// Class C
class C {
  // Method to check if a number is even
  isEven(num) {
    return num % 2 === 0;
  }
}
`,
      },
      {
        role: 'user',
        content: `
// Class D
class D {
  // Method to reverse a string
  reverseString(str) {
    return str.split('').reverse().join('');
  }
}

// Function to create a new task
function createTask(task) {
  // Validate task input
  if (!task.title || !task.description) {
    throw new Error('Invalid task input');
  }
}
`,
      },
      {
        role: 'user',
        content: `
  is in this project any thing about the word "hello"? if not, say no. if yes, then say which class it is in and method
`,
      },
    ];

    const response = await service.sendToGpt(input);

    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  }, 10000);
});
