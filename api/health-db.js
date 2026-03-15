const { query, isDatabaseConfigured, getCurrentMode } = require('./lib/db');
const { isOpenAIConfigured } = require('./lib/openai');

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
    const start = Date.now();
    const result = await query('SELECT 1 as test');
    const latency = Date.now() - start;
    
    health.checks.database = {
      status: 'ok',
      latency: `${latency}ms`,
      mode: getCurrentMode()
    };
  } catch (error) {
    health.status = 'degraded';
    health.checks.database = {
      status: 'error',
      message: error.message,
      mode: 'mock'
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
