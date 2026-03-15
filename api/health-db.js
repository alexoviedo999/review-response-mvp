const { query, isDatabaseConfigured } = require('./lib/db');
const { isOpenAIConfigured } = require('./lib/openai');

// Extended health check with DB connectivity
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: isDatabaseConfigured() ? 'live' : 'mock',
    checks: {}
  };

  // Check database
  try {
    const start = Date.now();
    const result = await query('SELECT 1 as test');
    const latency = Date.now() - start;
    
    health.checks.database = {
      status: 'ok',
      latency: `${latency}ms`,
      mode: isDatabaseConfigured() ? 'live' : 'mock'
    };
  } catch (error) {
    health.status = 'degraded';
    health.checks.database = {
      status: 'error',
      message: error.message
    };
  }

  // Check OpenAI
  health.checks.openai = {
    status: isOpenAIConfigured() ? 'configured' : 'mock',
    mode: isOpenAIConfigured() ? 'live' : 'mock'
  };

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
};
