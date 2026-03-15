import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock pg module
vi.mock('pg', () => ({
  Pool: vi.fn()
}));

// Mock openai module  
vi.mock('openai', () => ({
  default: vi.fn()
}));

import healthHandler from './health.js';
import healthDbHandler from './health-db.js';
import queueHandler from './responses/queue.js';
import generateHandler from './responses/generate.js';
import responseIdHandler from './responses/[id].js';
import approveHandler from './responses/approve/[id].js';
import rejectHandler from './responses/reject/[id].js';

function createMockRes() {
  const res = {
    statusCode: 200,
    status: vi.fn(function(code) {
      this.statusCode = code;
      return this;
    }),
    setHeader: vi.fn(function() { return this; }),
    json: vi.fn(function() { return this; }),
    end: vi.fn(function() { return this; })
  };
  return res;
}

function createMockReq(overrides = {}) {
  return {
    method: 'GET',
    query: {},
    body: {},
    ...overrides
  };
}

describe('Health Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return ok status with timestamp', async () => {
      const req = createMockReq();
      const res = createMockRes();

      await healthHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'ok' })
      );
    });
  });
});

describe('Input Validation Tests', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('GET /api/responses/queue', () => {
    it('should reject missing business_id', async () => {
      const req = createMockReq({ method: 'GET', query: {} });
      const res = createMockRes();

      await queueHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'business_id required' });
    });

    it('should handle OPTIONS preflight', async () => {
      const req = createMockReq({ method: 'OPTIONS' });
      const res = createMockRes();

      await queueHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('should reject non-GET methods', async () => {
      const req = createMockReq({ method: 'POST', query: { business_id: 'biz1' } });
      const res = createMockRes();

      await queueHandler(req, res);

      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET, OPTIONS');
    });
  });

  describe('POST /api/responses/generate', () => {
    it('should reject missing review_id', async () => {
      const req = createMockReq({ method: 'POST', query: {} });
      const res = createMockRes();

      await generateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'review_id required' });
    });

    it('should handle OPTIONS preflight', async () => {
      const req = createMockReq({ method: 'OPTIONS' });
      const res = createMockRes();

      await generateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('should reject non-POST methods', async () => {
      const req = createMockReq({ method: 'GET', query: { review_id: 'r1' } });
      const res = createMockRes();

      await generateHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });

  describe('PUT /api/responses/:id', () => {
    it('should reject missing response ID', async () => {
      const req = createMockReq({ method: 'PUT', query: {} });
      const res = createMockRes();

      await responseIdHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Response ID required' });
    });

    it('should handle OPTIONS preflight', async () => {
      const req = createMockReq({ method: 'OPTIONS', query: { id: 'resp1' } });
      const res = createMockRes();

      await responseIdHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('should reject non-PUT methods', async () => {
      const req = createMockReq({ method: 'POST', query: { id: 'resp1' } });
      const res = createMockRes();

      await responseIdHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });

  describe('POST /api/responses/approve/:id', () => {
    it('should reject missing response ID', async () => {
      const req = createMockReq({ method: 'POST', query: {} });
      const res = createMockRes();

      await approveHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Response ID required' });
    });

    it('should handle OPTIONS preflight', async () => {
      const req = createMockReq({ method: 'OPTIONS', query: { id: 'resp1' } });
      const res = createMockRes();

      await approveHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('should reject non-POST methods', async () => {
      const req = createMockReq({ method: 'GET', query: { id: 'resp1' } });
      const res = createMockRes();

      await approveHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });

  describe('POST /api/responses/reject/:id', () => {
    it('should reject missing response ID', async () => {
      const req = createMockReq({ method: 'POST', query: {} });
      const res = createMockRes();

      await rejectHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Response ID required' });
    });

    it('should handle OPTIONS preflight', async () => {
      const req = createMockReq({ method: 'OPTIONS', query: { id: 'resp1' } });
      const res = createMockRes();

      await rejectHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('should reject non-POST methods', async () => {
      const req = createMockReq({ method: 'GET', query: { id: 'resp1' } });
      const res = createMockRes();

      await rejectHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });
});

describe('CORS Headers', () => {
  it('should set CORS headers on health-db', async () => {
    const req = createMockReq();
    const res = createMockRes();

    await healthDbHandler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
  });
});
