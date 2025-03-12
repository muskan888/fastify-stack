import { FastifyInstance } from 'fastify';
import { setKey, getKey, deleteKey } from '../services/keyValueService';

// Defines routes for the in-memory key-value store with TTL support
export async function keyValueRoutes(fastify: FastifyInstance) {
  // POST /kv: Adds a key-value pair to the store with an optional TTL
  fastify.post('/kv', async (request, reply) => {
    // Extract key, value, and optional TTL from the request body
    const { key, value, ttl } = request.body as { key: string; value: string; ttl?: number };

    // Validate that key and value are non-empty strings
    if (!key || !value || typeof key !== 'string' || typeof value !== 'string') {
      return reply.code(400).send({ error: 'Key and value must be non-empty strings' });
    }

    // Validate TTL: must be a positive number if provided
    if (ttl !== undefined && (typeof ttl !== 'number' || ttl <= 0)) {
      return reply.code(400).send({ error: 'TTL must be a positive number' });
    }

    // Store the key-value pair with optional TTL
    setKey(key, value, ttl);

    // Respond with success status (201 Created)
    return reply.code(201).send({ message: 'Key set successfully' });
  });

  // GET /kv/:key: Retrieves the value for a given key, respecting TTL
  fastify.get('/kv/:key', async (request, reply) => {
    // Extract the key from the URL parameters
    const { key } = request.params as { key: string };

    // Attempt to retrieve the value from the store
    const value = getKey(key);

    // If the key doesn't exist or has expired, return a 404 error
    if (value === null) {
      return reply.code(404).send({ error: 'Key not found or expired' });
    }

    // Return the value if found
    return { value };
  });

  // DELETE /kv/:key: Removes a key-value pair from the store
  fastify.delete('/kv/:key', async (request, reply) => {
    // Extract the key from the URL parameters
    const { key } = request.params as { key: string };

    // Attempt to delete the key from the store
    const success = deleteKey(key);

    // If the key wasn't found, return a 404 error
    if (!success) {
      return reply.code(404).send({ error: 'Key not found' });
    }

    // Confirm successful deletion
    return { message: 'Key deleted successfully' };
  });
}