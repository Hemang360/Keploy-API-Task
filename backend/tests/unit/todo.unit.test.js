const mongoose = require('mongoose');
const Todo = require('../../models/todo');

describe('Todo Model Unit Tests', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a Todo with required fields', () => {
    const todo = new Todo({ title: 'Test Todo' });
    expect(todo.title).toBe('Test Todo');
    expect(todo.completed).toBe(false);
  });

  it('should require title field', () => {
    const todo = new Todo();
    const err = todo.validateSync();
    expect(err.errors.title).toBeDefined();
  });
}); 