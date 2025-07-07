import Redis from 'ioredis';

// Prefer full URL from environment (e.g. rediss://user:pass@host:6379). Fallback to Docker local host.
export const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({ host: 'redis', port: 6379 });

redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('error', (err) => console.error('Redis error', err));
