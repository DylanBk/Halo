import { Pool } from 'pg';
import config from './config';


const pool = new Pool({
    connectionString: config.dbUri
});

export default pool;