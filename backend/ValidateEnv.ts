import { config } from 'dotenv';
import * as fs from 'fs';

config();
const example = fs.readFileSync('./.env.example').toString();
const keys = example
  .split('\n')
  .filter((line) => !line.startsWith('#') && line.includes('='))
  .map((line) => line.trim().split('=')[0]);
console.log('Validating environment');
let pass = true;
const lostKeys = [];
keys.forEach((key, i) => {
  console.clear();
  console.debug(`${((i * 100) / keys.length).toFixed(2)}%`);
  console.debug(`validate ${key}`);

  const validKey = process.env.hasOwnProperty(key);
  if (!validKey) {
    lostKeys.push(key);
    pass = false;
  }
});
console.clear();
if (pass) {
  console.debug('100%');
  console.debug('environment is ready');
} else {
  const message = `Lost keys ${lostKeys.join(', ')}`;
  throw new Error(message);
}
