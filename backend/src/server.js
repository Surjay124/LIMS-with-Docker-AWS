import dotenv from 'dotenv';
import buildApp from './app.js';

dotenv.config();

const start = async () => {
    console.log('--- DEBUG: Starting Server ---');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('------------------------------');

    const app = await buildApp({
        logger: {
            level: process.env.LOG_LEVEL || 'info'
        }
    });

    try {
        const port = process.env.PORT || 3000;
        const host = process.env.HOST || '0.0.0.0';

        await app.listen({ port, host });
        // Logger will handle output
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
