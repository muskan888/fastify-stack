import { FastifyInstance } from 'fastify';
import { pushToStack, popFromStack } from '../services/stackService';

export async function stackRoutes(fastify: FastifyInstance) {
  fastify.post('/stack', async (request, reply) => {
    const { item } = request.body as { item: string };
    if (!item || typeof item !== 'string') {
      return reply.code(400).send({ error: 'Item must be a non-empty string' });
    }
    pushToStack(item);
    return reply.code(201).send({ message: 'Item added to stack' });
  });

  fastify.get('/stack', async (request, reply) => {
    const item = popFromStack();
    if (item === null) {
      return reply.code(404).send({ error: 'Stack is empty' });
    }
    return { item };
  });
}