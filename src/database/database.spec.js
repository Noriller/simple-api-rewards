const Database = require('./');

describe('Database', () => {
  let database;

  beforeEach(() => {
    database = Database();
    populateData();
  });

  it('should get the data', () => {
    expect(database.get()).toEqual(
      { "baz": { "foo": "qux" }, "foo": { "baz": "bar" }, "hello": { "data": "world" }, "hello2": { "data": "world2" } }
    );
  });

  it('should get one entry', () => {
    expect(database.get('hello2')).toEqual({ "data": "world2" });
  });

  it('should return nothing if no entry is found', () => {
    expect(database.get('invalid')).toEqual();
  });

  it('should save data', () => {
    const newData = { newData: 'newData' };
    database.save('test', newData);
    expect(database.get('test')).toEqual(newData);
  });

  it('should throw if saving primitive values', () => {
    expect(() => database.save('test', 'test')).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', 1)).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', false)).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', BigInt(1))).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', undefined)).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', null)).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', Symbol('test'))).toThrowError('Cannot save primitive values');
    expect(() => database.save('test', {})).not.toThrow();
    expect(() => database.save('test', [])).not.toThrow();
  });

  it('should update data', () => {
    const newData = { data: 'notWorld', newData: 'newData' };
    database.update('hello', newData);
    expect(database.get('hello')).toEqual(newData);
  });

  it('should throw if key is not found', () => {
    expect(() => database.update('invalid', {})).toThrowError('Key not found');
    expect(() => database.update('hello', { data: 'notWorld' })).not.toThrow();
  });


  it('should throw if updating with primitive values', () => {
    expect(() => database.update('hello', 'test')).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', 1)).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', false)).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', BigInt(1))).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', undefined)).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', null)).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', Symbol('test'))).toThrowError('Cannot save primitive values');
    expect(() => database.update('hello', {})).not.toThrow();
    expect(() => database.update('hello', [])).not.toThrow();
  });

  it('should remove data', () => {
    database.remove('hello');
    expect(database.get('hello')).toEqual();
    expect(database.get()).toEqual(
      { "baz": { "foo": "qux" }, "foo": { "baz": "bar" }, "hello2": { "data": "world2" } }
    );
  });

  function populateData() {
    database.save('hello2', { data: 'world2' });
    database.save('foo', { baz: 'bar' });
    database.save('baz', { foo: 'qux' });
  }
});
