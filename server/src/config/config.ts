import dotenv from 'dotenv';

dotenv.config();

interface Config {
    clientUrl: string,
    dbUri: string,
    port: number,
    nodeEnv: string,
    sessionSecret: string
};

const config: Config = {
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    dbUri: process.env.DB_URI || 'No database URI provided',
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    sessionSecret: process.env.SESSION_SECRET
};


export default config;