/**
 * This is a simple implementation of a database.
 */
function Database() {
  const data = new Map();
  data.set('hello', { data: 'world' });

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

  return {
    get,
    save,
    update,
    remove,
  };
}

module.exports = Database;