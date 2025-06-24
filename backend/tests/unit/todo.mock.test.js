jest.mock('../../models/todo');
const Todo = require('../../models/todo');

describe('Todo Model Mocked', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call save on Todo', async () => {
    const saveMock = jest.fn().mockResolvedValue({ _id: '1', title: 'Mocked', completed: false });
    Todo.mockImplementation(() => ({ save: saveMock }));
    const todo = new Todo({ title: 'Mocked' });
    const result = await todo.save();
    expect(saveMock).toHaveBeenCalled();
    expect(result.title).toBe('Mocked');
  });
}); 