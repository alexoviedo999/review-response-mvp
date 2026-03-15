const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const schema = fs.readFileSync('/root/.openclaw/workspace/agents/connor/review-response-mvp/backend/db/schema.sql', 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = schema.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        await pool.query(statement);
      }
    }
    
    console.log('✅ Database schema created successfully!');
    
    // Verify tables
    const result = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    console.log('Tables created:', result.rows.map(r => r.table_name).join(', '));
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
