import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Command } from 'commander';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  const program = new Command();

  program
    .option('-s, --scan <folder>', 'Scan a project folder and feed it to GPT-4')
    .option('-a, --ask <question>', 'Ask a question to GPT-4')
    .action(async (options) => {
      if (options.scan) {
        await appService.scanProject(options.scan, options.ask);
      } else if (options.ask) {
        await appService.askQuestion(options.ask);
      } else {
        console.log('Please provide a valid option.');
        program.help();
      }
    });

  program.parseAsync(process.argv);
}

bootstrap();
