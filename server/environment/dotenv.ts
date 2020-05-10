import chalk from 'chalk';
import dotenv from 'dotenv';

export function loadDotenv() {
  const dotenvResult = dotenv.config();

  if (dotenvResult.error) {
    console.error('');
    console.error(
      `${chalk.bgRedBright(
        chalk.whiteBright(' ERROR '),
      )} There was a problem loading your environment.`,
    );
    console.error(`\t${chalk.gray(dotenvResult.error.message)}`);
    if (dotenvResult.error.message.indexOf('ENOENT') !== -1) {
      console.error(`\n\t💡 Are you missing a .env file?`);
    }
    console.error('');
  } else {
    console.log(`✨ Loaded .env`);
  }
}
