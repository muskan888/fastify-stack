# Fastify In-Memory Stack and Key-Value Store

A TypeScript-based Fastify application implementing an in-memory stack (LIFO) and a key-value store with optional TTL.

## Setup
1. **Extract the Archive**
   ```bash
   tar -xf submission.tar
   ```
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Run tests: `npm test`

## API Endpoints

### Stack (LIFO)
- **POST /stack**: Add an item to the stack
  - Body: `{ "item": "string" }`
  - Example: `curl -X POST http://localhost:3000/stack -H "Content-Type: application/json" -d '{"item":"Hello"}'`
- **GET /stack**: Retrieve and remove the top item
  - Example: `curl http://localhost:3000/stack`

### Key-Value Store
- **POST /kv**: Set a key-value pair with optional TTL (in seconds)
  - Body: `{ "key": "string", "value": "string", "ttl": number (optional) }`
  - Example: `curl -X POST http://localhost:3000/kv -H "Content-Type: application/json" -d '{"key":"name","value":"John","ttl":30}'`
- **GET /kv/:key**: Retrieve a key's value
  - Example: `curl http://localhost:3000/kv/name`
- **DELETE /kv/:key**: Delete a key
  - Example: `curl -X DELETE http://localhost:3000/kv/name`

## Notes
- Data is stored in memory and lost on restart.
- TTL is specified in seconds.
- Tests cover all functionality using Jest.