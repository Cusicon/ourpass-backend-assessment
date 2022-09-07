import { config } from 'dotenv';

config();

export const ENV = {
  ...process.env,
};
