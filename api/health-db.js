const { getPool } = require('./lib/db');

// Extended health check with DB connectivity
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {}
  };

  // Check database
  try {
    const pool = getPool();
    const start = Date.now();
    const result = await pool.query('SELECT 1 as test');
    const latency = Date.now() - start;
    
    health.checks.database = {
      status: 'ok',
      latency: `${latency}ms`
    };
  } catch (error) {
    health.status = 'degraded';
    health.checks.database = {
      status: 'error',
      message: error.message
    };
  }

  // Check OpenAI (just verify key exists)
  health.checks.openai = {
    status: process.env.OPENAI_API_KEY ? 'configured' : 'missing'
  };

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
};
