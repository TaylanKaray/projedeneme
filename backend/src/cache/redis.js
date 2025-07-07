import Redis from 'ioredis';

export const redisClient = new Redis({ host: 'redis', port: 6379 });

redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('error', (err) => console.error('Redis error', err));
