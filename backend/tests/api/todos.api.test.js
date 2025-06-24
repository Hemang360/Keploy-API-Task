const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Todo = require('../../models/todo');
let app;

describe('To-Do API Endpoints', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
    app = require('../../server');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Todo.deleteMany();
  });

  describe('GET /todos', () => {
    it('should return empty array initially', async () => {
      const res = await request(app).get('/todos');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app).post('/todos').send({ title: 'API Test' });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('API Test');
      expect(res.body.completed).toBe(false);
    });
    it('should fail if title is missing', async () => {
      const res = await request(app).post('/todos').send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update an existing todo', async () => {
      const todo = await Todo.create({ title: 'To Update' });
      const res = await request(app).put(`/todos/${todo._id}`).send({ completed: true });
      expect(res.statusCode).toBe(200);
      expect(res.body).toBe('Todo updated!');
      const updated = await Todo.findById(todo._id);
      expect(updated.completed).toBe(true);
    });
    it('should return 404 for non-existent todo', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/todos/${fakeId}`).send({ title: 'Nope' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete an existing todo', async () => {
      const todo = await Todo.create({ title: 'To Delete' });
      const res = await request(app).delete(`/todos/${todo._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBe('Todo deleted.');
      const found = await Todo.findById(todo._id);
      expect(found).toBeNull();
    });
    it('should return 400 for invalid id', async () => {
      const res = await request(app).delete('/todos/invalidid');
      expect(res.statusCode).toBe(400);
    });
  });
}); 