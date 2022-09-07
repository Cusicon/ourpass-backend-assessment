import { config } from 'dotenv';
config();

const envObj = { ...process.env };

envObj.MONGODB_URI =
  envObj.NODE_ENV == 'production'
    ? envObj.MONGODB_LIVE_URI
    : envObj.MONGODB_LOCAL_URI;

export const ENV = { ...envObj };
