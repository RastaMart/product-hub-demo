import { neon, neonConfig } from '@neondatabase/serverless';

// Configure neon to use fetch polyfill

const sql = neon(process.env.DATABASE_URL!);

export default sql;