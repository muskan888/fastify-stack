import { FastifyInstance } from 'fastify';
import { setKey, getKey, deleteKey } from '../services/keyValueService';

export async function keyValueRoutes(fastify: FastifyInstance) {
  fastify.post('/kv', async (request, reply) => {
    const { key, value, ttl } = request.body as { key: string; value: string; ttl?: number };
    if (!key || !value || typeof key !== 'string' || typeof value !== 'string') {
      return reply.code(400).send({ error: 'Key and value must be non-empty strings' });
    }
    if (ttl !== undefined && (typeof ttl !== 'number' || ttl <= 0)) {
      return reply.code(400).send({ error: 'TTL must be a positive number' });
    }
    setKey(key, value, ttl);
    return reply.code(201).send({ message: 'Key set successfully' });
  });

  fastify.get('/kv/:key', async (request, reply) => {
    const { key } = request.params as { key: string };
    const value = getKey(key);
    if (value === null) {
      return reply.code(404).send({ error: 'Key not found or expired' });
    }
    return { value };
  });

  fastify.delete('/kv/:key', async (request, reply) => {
    const { key } = request.params as { key: string };
    const success = deleteKey(key);
    if (!success) {
      return reply.code(404).send({ error: 'Key not found' });
    }
    return { message: 'Key deleted successfully' };
  });
}