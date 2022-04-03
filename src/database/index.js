/**
 * This is a simple implementation of a database.
 */
function Database() {
  const data = new Map();
  setHello();

  function get(key) {
    if (key) {
      return data.get(key);
    }

    return Object.fromEntries(data);
  }

  function save(key, value) {
    if (typeof value !== 'object' || value === null) {
      throw new Error('Cannot save primitive values');
    }

    data.set(key, value);
  }

  function update(key, value) {
    if (typeof value !== 'object' || value === null) {
      throw new Error('Cannot save primitive values');
    }

    if (!data.has(key)) {
      throw new Error('Key not found');
    }

    const newValue = { ...data.get(key), ...value };
    data.set(key, newValue);
  }

  function remove(key) {
    data.delete(key);
  }

  function setHello() {
    data.set('hello', { data: 'world' });
  }

  function clear() {
    data.clear();
    setHello();
  }

  return {
    get,
    save,
    update,
    remove,
    clear,
  };
}

// Node module exports make this a singleton.
module.exports = Database();