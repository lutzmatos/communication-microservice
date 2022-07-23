const env = process.env;

export const API_SECRET = env.API_SECRET
    ? env.API_SECRET
    : "YmlzY29pdG8tbW9saGFkby1uYW8tc2UtY29tZQ==";

export const MONGO_HOST = env.MONGO_HOST || 'localhost';
export const MONGO_PORT = env.MONGO_PORT || '27017';
export const MONGO_DB = env.MONGO_DB || 'sales-db';
export const MONGO_USERNAME = env.MONGO_USERNAME || 'admin';
export const MONGO_PASSWORD = env.MONGO_PASSWORD || 'admin';

export const MONGO_DB_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
// export const MONGO_DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
