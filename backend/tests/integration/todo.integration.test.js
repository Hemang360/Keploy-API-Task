const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Todo = require('../../models/todo');

describe('Todo Model Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Todo.deleteMany();
  });

  it('should create and retrieve a todo', async () => {
    const todo = new Todo({ title: 'Integration Test' });
    await todo.save();
    const found = await Todo.findOne({ title: 'Integration Test' });
    expect(found).not.toBeNull();
    expect(found.title).toBe('Integration Test');
  });

  it('should update a todo', async () => {
    const todo = new Todo({ title: 'To Update' });
    await todo.save();
    todo.completed = true;
    await todo.save();
    const updated = await Todo.findById(todo._id);
    expect(updated.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const todo = new Todo({ title: 'To Delete' });
    await todo.save();
    await Todo.findByIdAndDelete(todo._id);
    const found = await Todo.findById(todo._id);
    expect(found).toBeNull();
  });
}); 