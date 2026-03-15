const { Pool } = require('pg');

async function checkTables() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    console.log('Tables in database:', result.rows.map(r => r.table_name).join(', '));
    
    // Check if we can query the businesses table
    const bizResult = await pool.query('SELECT COUNT(*) FROM businesses');
    console.log('Businesses count:', bizResult.rows[0].count);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkTables();
